import React, { Component } from 'react'
import Slides from '../slides-panel/Slides'
import DropTargetPage from '../page/Page'
import Sidebar from '../palette/Sidebar'
import { connect } from 'react-redux'
import {
    getPages,
    setCurrentPage,
    addPage,
    deletePage,
    updateBlock,
    setActiveBlock,
    addBlock
} from '../../actions/pages'

class Main extends Component {
    componentDidMount() {
        this.props.getPages()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps)
            this.props = nextProps
    }

    render() {
        let pages = this.props.pagesReducer.pages? this.props.pagesReducer.pages: []
        let currentPage = this.props.pagesReducer.currentPage ? this.props.pagesReducer.currentPage : { blocks: [] }
        let currentBlock = this.props.pagesReducer.currentBlock || null

        return (
            <div className="columns">
                <div className="column is-2">
                    <Slides
                        pages={pages}
                        currentPage={currentPage}
                        setCurrentPage={this.props.setCurrentPage.bind(this)}
                        addPage={this.props.addPage.bind(this)}
                        deletePage={this.props.deletePage.bind(this)}
                    />
                </div>
                <div className="column is-8">
                    <DropTargetPage
                        id={currentPage.id}
                        mode="edit"
                        blocks={currentPage.blocks}
                        currentBlock={currentBlock}
                        updateBlock={this.props.updateBlock.bind(this)}
                        setActiveBlock={this.props.setActiveBlock.bind(this)}
                    />
                </div>
                {/* <div className="column">
                    <Sidebar
                        currentPage={currentPage}
                        addBlock={this.props.addBlock.bind(this)}
                    />
                </div> */}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getPages: () => dispatch(getPages()),
    updateBlock: (params) => dispatch(updateBlock(params)),
    setActiveBlock: (params) => dispatch(setActiveBlock(params)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    addPage: () => dispatch(addPage()),
    deletePage: (pageIds) => dispatch(deletePage(pageIds)),
    addBlock: (pageId) => dispatch(addBlock(pageId))
})

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)
