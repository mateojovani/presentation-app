const uuid = require('uuid/v4')

//DUMMY CONTENT
const pages = [
    {
        id: uuid(),
        blocks: [
            {
                id: uuid(),
                type: "TextBox",
                top: 20,
                left: 80,
                width: "40%",
                height: "15%",
                content: ""
            },
            {
                id: uuid(),
                type: "TextBox",
                top: 100,
                left: 80,
                width: "40%",
                height: "15%",
                content: ""
            },
            // {
            //     id: uuid(),
            //     type: "Image",
            //     top: 180,
            //     left: 80,
            //     width: "40%",
            //     height: "40%"
            // }
        ]
    },
    {
        id: uuid(),
        blocks: [
            {
                id: uuid(),
                type: "TextBox",
                top: 20,
                left: 80,
                width: "40%",
                height: "15%",
                content: "Hi"
            }
        ]
    }
]

const pageTemplate = (id = uuid()) => {
    return {
        id: id,
        blocks: []
    }
}

const blockTemplate = (id = uuid()) => {
    return {
        id: id,
        type: "TextBox",
        top: 100,
        left: 80,
        width: "40%",
        height: "15%",
        content: ""
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

export const addBlock = ({pageId, block}) => dispatch => {
    return dispatch({
        type: 'BLOCK_ADD',
        payload: {pageId, block: blockTemplate()}
    })
}