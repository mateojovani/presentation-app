import React from 'react'
import { renderBlock } from './Block'

const ImageBlock = ({
    id,
    mode,
    src,
    draggable,
    width,
    height,
    left,
    top,
    onUpdate,
    onFocus,
    focused
}) => {

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
        () => <img src={src} alt="" style={{width: "100%", height: "96%"}}/>,
        () => <img src={src} alt="" style={{width: "100%", height: "96%"}}/>
    )

}

export default ImageBlock