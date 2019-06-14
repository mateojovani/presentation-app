import React, { useEffect } from 'react'
import { renderBlock } from './Block'
import { Editor } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

const TextBlock = ({
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

    // useEffect(() => {

    // }, [content])

    const handleChange = (state) => {
        onUpdate({ id, content: state })
    }

    const renderEditor = () => {
        return (
            <div style={{ fontSize: '2rem', height: '100%' }}>
                <Editor
                    editorState={content}
                    onChange={editorState => handleChange(editorState)}
                />
            </div>
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
    () => renderEditor(),
    () => <div style={{ fontSize: '2rem', height: '100%' }} dangerouslySetInnerHTML={{ __html: stateToHTML(content.getCurrentContent()) }}></div>
    )
}

export default TextBlock
