import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react';
import CkeditorConfig from './CkeditorConfig'
import DraggableBlock, { Block } from './Block'

export default class TextBlock extends Component {
    constructor(props) {
        super(props)
        this.editor = null
    }

    renderCKEditor() {
        return (
            <CKEditor
                editor={ClassicEditor}
                config={CkeditorConfig}
                data={this.props.content}
                onInit={editor => {
                    if (!this.editor)
                        this.editor = editor
                }}
                onChange={(event, editor) => {
                    this.props.onUpdate({ id: this.props.id, content: editor.getData() })
                }}
                onBlur={editor => {
                    console.log('Blur.', editor)
                }}
                onFocus={editor => {
                    console.log('Focus.', editor)
                }}
            />
        )
    }

    render() {
        const {
            mode,
            content,
            draggable,
            width,
            height,
            left,
            top
        } = this.props

        return mode === "edit" ?
            (
                <DraggableBlock
                    id={this.props.id}
                    draggable={draggable}
                    width={width}
                    height={height}
                    left={left}
                    top={top}
                    onUpdate={this.props.onUpdate}
                >
                    { this.renderCKEditor() }
                </DraggableBlock>
            ) :
            (
                <Block
                    id={this.props.id}
                    draggable={draggable}
                    width={width}
                    height={height}
                    left={left}
                    top={top}
                    onUpdate={this.props.onUpdate}
                >
                    <div style={{"fontSize":"0.5rem"}} dangerouslySetInnerHTML={{ __html: content }}></div>
                </Block>
            )

    }
}
TextBlock.propTypes = {
    id: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
}