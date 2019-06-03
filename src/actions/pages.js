const uuid = require('uuid/v4')
const { EditorState } = require('draft-js')

//DUMMY CONTENT
const pages = [
    {
        id: uuid(),
        blocks: []
    }
]

const pageTemplate = (id = uuid()) => {
    return {
        id: id,
        blocks: []
    }
}

const blockTemplate = (id = uuid(), name) => {
    switch (name) {
    case 'RichTextBlock': {
        return {
            id: id,
            type: name,
            top: '10%',
            left: '10%',
            width: '40%',
            height: '15%',
            content: ''
        }
    }
    case 'ImageBlock': {
        return {
            id: id,
            type: name,
            top: '10%',
            left: '10%',
            width: '30%',
            height: '30%',
            src: 'https://via.placeholder.com/150'
        }
    }
    default: {
        return {
            id: id,
            type: name,
            top: '10%',
            left: '10%',
            width: '40%',
            height: '15%',
            content: EditorState.createEmpty()
        }
    }
    }
}

export const getPages = () => dispatch => {
    return dispatch({
        type: 'PAGES_GET',
        payload: pages
    })
}

export const setCurrentPage = (page) => dispatch => {
    return dispatch({
        type: 'PAGES_ACTIVE',
        payload: page
    })
}

export const addPage = () => dispatch => {
    return dispatch({
        type: 'PAGES_ADD',
        payload: pageTemplate()
    })
}

export const deletePage = (pageIds) => dispatch => {
    return dispatch({
        type: 'PAGES_DELETE',
        payload: {pageIds}
    })
}

export const updateBlock = (params) => dispatch => {
    return dispatch({
        type: 'BLOCK_UPDATE',
        payload: params
    })
}

export const setActiveBlock = (params) => dispatch => {
    return dispatch({
        type: 'BLOCK_ACTIVE',
        payload: params
    })
}

export const addBlock = ({pageId, block}) => dispatch => {
    return dispatch({
        type: 'BLOCK_ADD',
        payload: {pageId, block: blockTemplate(uuid(), block)}
    })
}