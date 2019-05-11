import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react'
import CkeditorConfig from './CkeditorConfig'
import { renderBlock } from './Block'

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
                // onBlur={editor => {
                //     console.log('Blur.', editor)
                // }}
                // onFocus={editor => {
                //     console.log('Focus.', editor)
                // }}
            />
        )
    }

    render() {
        const {
            id,
            mode,
            content,
            draggable,
            width,
            height,
            left,
            top,
            onUpdate,
            onFocus,
            focused
        } = this.props


        return renderBlock(mode, {
            id,
            draggable,
            width,
            height,
            left,
            top,
            onUpdate,
            onFocus,
            focused
        },
        () => this.renderCKEditor(),
        () => <div dangerouslySetInnerHTML={{ __html: content }}></div>
        )

    }
}
TextBlock.propTypes = {
    id: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
}
