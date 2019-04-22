import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
const uuid = require('uuid/v1')

export const Block = ({
    id,
    left,
    top,
    connectDragSource,
    isDragging,
    children,
    width,
    height
}) => {
    if (isDragging) {
        return null
    }

    const content = (draggable = false) => (
        <div
            id={id || uuid()}
            style={{
                position: "absolute",
                border: draggable ? "1px dashed gray": "none",
                backgroundColor: "white",
                padding: "0.1rem 0.1rem",
                cursor: "move",
                resize: draggable ? "both": "none",
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

const DraggableBlock = DragSource(
    'block',
    {
        beginDrag(props) {
            const getSize = () => {
                const el = document.getElementById(props.id)
                return { width: el.style.width, height: el.style.height }
            }
            const size = getSize()
            const { id, left, top } = props

            return { id, left, top, width: size.width, height: size.height }
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

export default DraggableBlock