import React from 'react'
import { DropTarget } from 'react-dnd'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Types } from './blocks/Components'

/**
 * Unless the React DND supports Stateless components and hooks
 * This will remain a class component
 */

export class Page extends React.Component {
    constructor() {
        super(...arguments)

        this.page = null
        this.updateBlock = this.updateBlock.bind(this)
        this.setActiveBlock = this.setActiveBlock.bind(this)
        this.isActive = this.isActive.bind(this)
    }

    updateBlock(props) {
        this.props.updateBlock({ pageId: this.props.id, ...this.getRelativeSize(props) })
    }

    getRelativeSize(props) {
        if (props.width && props.width.indexOf('px') > -1)
            props.width = (parseFloat(props.width.split('px')[0]) / this.page.offsetWidth * 100) + '%'
        if (props.height && props.height.indexOf('px') > -1)
            props.height = (parseFloat(props.height.split('px')[0]) / this.page.offsetHeight * 100) + '%'

        return props
    }

    setActiveBlock(props) {
        this.props.setActiveBlock({ pageId: this.props.id, ...props })
    }

    isActive({ id }) {
        if (this.props.currentBlock) {
            return this.props.currentBlock.id === id
        }

        return false
    }

    renderBlocks(blocks) {
        return blocks.map((block, key) => {
            const Block = Types[block.type]

            return (
                <Block
                    key={key}
                    mode={this.props.mode}
                    onUpdate={this.updateBlock}
                    onFocus={this.setActiveBlock}
                    focused={this.isActive(block)}
                    {...block}
                />
            )
        })
    }

    render() {
        const {
            id,
            connectDropTarget,
            width,
            height,
            blocks
        } = this.props

        const content = (
            <div id={connectDropTarget ? 'drop-page-' + id : 'slide-' + id}>
                <div
                    ref={page => this.page = page}
                    className={connectDropTarget ? 'drop-page-box box': 'slide-box box'}
                    style={{
                        position: 'relative',
                        width: width || '100%',
                        height: height || '100vh'
                    }}
                >
                    {this.renderBlocks(blocks)}
                </div>
            </div>
        )

        if (connectDropTarget) {
            return connectDropTarget(content)
        }

        return content
    }
}

const getRelativeDelta = ({ id }, delta) => {
    const page = document.getElementById('drop-page-' + id)
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
            const left = parseFloat(item.left.split('%')[0]) + delta.x + '%'
            const top = parseFloat(item.top.split('%')[0]) + delta.y + '%'

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
