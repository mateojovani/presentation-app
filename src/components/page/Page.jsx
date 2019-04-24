import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TextBlock from './blocks/TextBlock'

export class Page extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            mode: this.props.mode
        }

        this.updateBlock = this.updateBlock.bind(this)
        this.toggleMode = this.toggleMode.bind(this)
    }

    updateBlock(props) {
        this.props.updateBlock({ pageId: this.props.id, ...props })
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
            const { content, left, top, width, height, id } = block

            return (
                <TextBlock
                    id={id}
                    content={content}
                    mode={this.state.mode}
                    width={width}
                    height={height}
                    left={left}
                    top={top}
                    key={key}
                    onUpdate={this.updateBlock}
                >
                </TextBlock>
            )
        })
    }

    render() {
        const { connectDropTarget, width, height, blocks } = this.props

        const content = (
            <div id={this.id}>
                <div
                    className="box"
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

let DropTargetPage = DropTarget(
    'block',
    {
        drop(props, monitor, component) {
            if (!component) {
                return
            }
            const item = monitor.getItem()
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            component.updateBlock({ id: item.id, left, top })
        },
    },
    connect => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(Page)
DropTargetPage = DragDropContext(HTML5Backend)(DropTargetPage)

export default DropTargetPage
