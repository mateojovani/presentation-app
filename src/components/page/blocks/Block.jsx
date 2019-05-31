import React from 'react'
import { DragSource } from 'react-dnd'
import ResizeObserver from 'resize-observer-polyfill'
import interact from 'interactjs'
import { withStyles } from '@material-ui/styles'

const styles = {
    reizable: {
        borderTop: '3px solid blue',
        borderLeft: '3px solid blue',
        borderRight: '3px dashed blue',
        borderBottom: '3px dashed blue'
    },
    draggable: {
        border: '1px dashed gray'
    }
}

export class Block extends React.Component {
    constructor(props) {
        super(props)

        this.box = null
        this.boxObserver = null
    }

    initInteract() {
        interact(this.box)
            .resizable({
                edges: { left: false, right: true, bottom: true, top: false },

                modifiers: [
                    // keep the edges inside the parent
                    interact.modifiers.restrictEdges({
                        outer: 'parent',
                        endOnly: true,
                    }),

                    // minimum size
                    interact.modifiers.restrictSize({
                        min: { width: 10, height: 50 }
                    }),
                ],

                inertia: false
            })
            .on('resizemove', function (event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'

                // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)'

                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
            })

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
            this.props.onFocus({ id: this.props.id })
    }

    componentDidMount() {
        const { connectDragSource } = this.props

        if (connectDragSource) {
            this.boxObserver = this.initObserver(this.box)
            this.boxObserver.observe(this.box)
            this.initInteract()
        }
    }

    componentDidUpdate() {
        const { connectDragSource } = this.props

        if (connectDragSource && this.box) { //reinit observe after drag and drop
            this.boxObserver.observe(this.box)
            this.initInteract()
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
            height,
            classes
        } = this.props

        if (isDragging) {
            return null
        }

        const content = (draggable = false) => (
            <div
                id={id}
                ref={box => this.box = box}
                onClick={() => this.setActive(draggable)}
                className={draggable ? focused ? classes.reizable: classes.draggable: ''}
                style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    padding: '0.1rem 0.1rem',
                    cursor: 'move',
                    overflow: 'auto',
                    width: width || '100%',
                    height: height || '100%',
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
)(withStyles(styles)(Block))

export const renderBlock = (mode, props, renderEdit, renderPreview) => {
    return mode === 'edit' ?
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
