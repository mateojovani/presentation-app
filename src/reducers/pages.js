const initialState = {
    pages: null,
    currentPage: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "PAGES_GET":
            return { ...state, pages: action.payload, currentPage: action.payload[0] }
        case "PAGES_ACTIVE":
            return { ...state, currentPage: action.payload }
        case "PAGES_ADD":
            state.pages.push(action.payload)
            return { ...state, currentPage: action.payload }
        case "PAGES_DELETE":
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
        case "BLOCK_UPDATE":
            const { pageId, id } = action.payload
            const page = state.pages.find(page => page.id === pageId)
            let block = page.blocks.find(block => block.id === id)
            Object.assign(block, action.payload)

            return { ...state }
        case "BLOCK_ADD":
            let p = state.pages.find(page => page.id === action.payload.pageId)
            p.blocks.push(action.payload.block)

            return { ...state }
        default:
            return { ...state }
    }
}