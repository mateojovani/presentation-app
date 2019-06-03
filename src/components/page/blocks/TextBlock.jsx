import React, { useEffect } from 'react'
import { renderBlock } from './Block'
import { Editor } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import textFit from 'textfit'

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

    useEffect(() => {
        textFit(document.getElementById(id), {multiLine: true, alignVert: true})
    }, [content])

    const handleChange = (state) => {
        onUpdate({ id, content: state})
    }

    const renderEditor = () => {
        return (
            <Editor
                editorState={content}
                onChange={editorState => handleChange(editorState)}
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
    () => renderEditor(),
    () => <div dangerouslySetInnerHTML={{ __html: stateToHTML(content.getCurrentContent()) }}></div>
    )
}

export default TextBlock
