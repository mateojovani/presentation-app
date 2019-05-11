const initialState = {
    pages: null,
    currentPage: null,
    currentBlock: null
}

export default (state = initialState, action) => {
    switch (action.type) {
    case 'PAGES_GET':
        return { ...state, pages: action.payload, currentPage: action.payload[0] }
    case 'PAGES_ACTIVE':
        return { ...state, currentPage: action.payload }
    case 'PAGES_ADD':
        state.pages.push(action.payload)
        return { ...state, currentPage: action.payload }
    case 'PAGES_DELETE': {
        const toDelete = action.payload.pageIds
        const currentPageId = state.currentPage.id

        toDelete.forEach(id => {
            for (let i = 0; i < state.pages.length; i++)
                if (id === state.pages[i].id) {
                    state.pages.splice(i, 1)
                    break
                }
        })
        if (toDelete.includes(currentPageId)) {
            state.currentPage = state.pages[state.pages.length - 1]
        }

        return { ...state }
    }
    case 'BLOCK_UPDATE': {
        const { pageId, id } = action.payload
        const page = state.pages.find(page => page.id === pageId)
        let block = page.blocks.find(block => block.id === id)
        if (block) Object.assign(block, action.payload)

        return { ...state }
    }
    case 'BLOCK_ACTIVE': {
        const { pageId, id } = action.payload
        let page = state.pages.find(page => page.id === pageId)
        let block = page.blocks.find(block => block.id === id)

        return { ...state, currentBlock: block || null }
    }
    case 'BLOCK_ADD': {
        const { pageId, block } = action.payload
        let page = state.pages.find(page => page.id === pageId)
        page.blocks.push(block)

        return { ...state, currentBlock: block }
    }
    default:
        return { ...state }
    }
}
