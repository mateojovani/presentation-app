import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Components from '../palette/Components'

export class Page extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            mode: this.props.mode
        }

        this.page = null
        this.updateBlock = this.updateBlock.bind(this)
        this.setActiveBlock = this.setActiveBlock.bind(this)
        this.toggleMode = this.toggleMode.bind(this)
        this.isActive = this.isActive.bind(this)
    }

    updateBlock(props) {
        this.props.updateBlock({ pageId: this.props.id, ...this.getRelativeSize(props) })
    }

    getRelativeSize(props) {
        if (props.width && props.width.indexOf("px") > -1)
            props.width = (parseFloat(props.width.split("px")[0]) / this.page.offsetWidth * 100) + "%"
        if (props.height && props.height.indexOf("px") > -1)
            props.height = (parseFloat(props.height.split("px")[0]) / this.page.offsetHeight * 100) + "%"

        return props
    }

    setActiveBlock(props) {
        this.props.setActiveBlock({pageId: this.props.id, ...props})
    }

    isActive({id}) {
        if (this.props.currentBlock) {
            return this.props.currentBlock.id === id
        }

        return false
    }

    toggleMode() {
        if (this.state.mode === "edit") {
            this.setState(
                update(this.state, {
                    $merge: { mode: "preview" }
                })
            )
        } else {
            this.setState(
                update(this.state, {
                    $merge: { mode: "edit" }
                })
            )
        }
    }

    renderBlocks(blocks) {
        return blocks.map((block, key) => {
            const Block = Components[block.type].constructor

            return (
                <Block
                    key={key}
                    mode={this.state.mode}
                    onUpdate={this.updateBlock}
                    onFocus={this.setActiveBlock}
                    focused={this.isActive(block)}
                    {...block}
                />
            )
        })
    }

    render() {
        const { connectDropTarget, width, height, blocks } = this.props

        const content = (
            <div id={connectDropTarget? "drop-page-" + this.props.id: "slide-" + this.props.id}>
                <div
                    className={connectDropTarget ? "drop-page-box box": "slide-box box"}
                    ref={page => this.page = page}
                    style={{
                        position: "relative",
                        width: width || "100%",
                        height: height || "700px"
                    }}
                >
                    {this.renderBlocks(blocks)}
                </div>
                <div>
                    {connectDropTarget?
                        <button className="button" onClick={this.toggleMode}>Toggle Mode</button>:
                        null
                    }
                </div>
            </div>
        )

        if (connectDropTarget) {
            return connectDropTarget(content)
        }

        return content
    }
}

Page.propTypes = {
    id: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
}

const getRelativeDelta = ({id}, delta) => {
    const page = document.getElementById("drop-page-" + id)
    delta.x = delta.x / page.offsetWidth * 100
    delta.y = delta.y / page.offsetHeight * 100

    return delta
}

let DropTargetPage = DropTarget(
    'block',
    {
        drop(props, monitor, component) {
            if (!component) {
                return
            }
            const item = monitor.getItem()
            const delta = getRelativeDelta(props, monitor.getDifferenceFromInitialOffset())
            const left = parseFloat(item.left.split("%")[0]) + delta.x + "%"
            const top = parseFloat(item.top.split("%")[0]) + delta.y + "%"

            component.updateBlock({ id: item.id, left, top })
            component.setActiveBlock({ id: item.id })
        },
    },
    connect => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(Page)
DropTargetPage = DragDropContext(HTML5Backend)(DropTargetPage)

export default DropTargetPage
