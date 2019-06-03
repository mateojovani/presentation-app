import React from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react'
import CkeditorConfig from './CkeditorConfig'
import { renderBlock } from './Block'

const RichTextBlock = ({
    id,
    onUpdate,
    mode,
    content,
    draggable,
    width,
    height,
    left,
    top,
    onFocus,
    focused
}) => {
    let editor = null

    const renderCKEditor = () => {
        return (
            <CKEditor
                editor={ClassicEditor}
                config={CkeditorConfig}
                data={content}
                onInit={_editor => {
                    if (!editor) editor = _editor
                }}
                onChange={(event, editor) => {
                    onUpdate({ id, content: editor.getData() })
                }}
            />
        )
    }

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
    () => renderCKEditor(),
    () => <div dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}

export default RichTextBlock
