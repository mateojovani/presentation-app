import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
export class Block extends React.Component {
    constructor(props) {
        super(props)

        this.box = null
        this.boxObserver = null
    }

    initObserver() {
        return new ResizeObserver(([entry]) => {
            let box = entry.target
            if (box)
                this.props.onUpdate({ id: this.props.id, width: box.style.width, height: box.style.height })
        })
    }

    setActive(draggable) {
        if (draggable)
            this.props.onFocus({id: this.props.id})
    }

    componentDidMount() {
        const {connectDragSource} = this.props

        if (connectDragSource) {
            this.boxObserver = this.initObserver(this.box)
            this.boxObserver.observe(this.box)
        }
    }

    componentDidUpdate() {
        const {connectDragSource} = this.props

        if (connectDragSource && this.box) { //reinit observe after drag and drop
            this.boxObserver.observe(this.box)
        }
    }

    render() {
        const {
            id,
            left,
            top,
            connectDragSource,
            isDragging,
            children,
            focused,
            width,
            height
        } = this.props

        if (isDragging) {
            return null
        }

        const content = (draggable = false) => (
            <div
                id={id}
                ref={ box => this.box = box }
                onClick={() => this.setActive(draggable)}
                style={{
                    position: "absolute",
                    border: draggable ? focused ? "3px dashed blue" : "1px dashed gray" : "none",
                    backgroundColor: "white",
                    padding: "0.1rem 0.1rem",
                    cursor: "move",
                    resize: draggable ? "both" : "none",
                    overflow: "auto",
                    // "max-width": width,
                    width: width || "100%",
                    height: height || "100%",
                    left: left,
                    top: top
                }}
            >
                {children}
            </div>
        )

        if (connectDragSource) {
            return connectDragSource(content(true))
        }

        return content()
    }

}

const DraggableBlock = DragSource(
    'block',
    {
        beginDrag(props) {

            const { id, left, top } = props
            return { id, left, top }
        },
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }),
)(Block)

Block.propTypes = {
    id: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
}

export const renderBlock = (mode, props, renderEdit, renderPreview) => {
    return mode === "edit" ?
        (
            <DraggableBlock {...props}>
                {renderEdit()}
            </DraggableBlock>
        ) :
        (
            <Block {...props}>
                {renderPreview()}
            </Block>
        )
}

export default DraggableBlock