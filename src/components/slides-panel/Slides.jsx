import React, { Component } from 'react'
import { Page }  from '../page/Page'

export default class Slides extends Component {

    renderPages(pages, currentPage, setCurrentPage) {
        return pages.map((page, key) => (
            <div
                key={key}
                style={currentPage.id === page.id? {'borderLeft': 'solid hsl(204, 86%, 53%) 5px'}: {}}
                onClick={() => setCurrentPage(page)}
            >
                <Page
                    id={page.id}
                    mode="preview"
                    blocks={page.blocks}
                    height="200px"
                />
            </div>
        ))
    }

    render() {
        const {
            pages,
            currentPage,
            setCurrentPage,
            addPage,
            deletePage
        } = this.props

        return (
            <div>
                {this.renderPages(pages, currentPage, setCurrentPage)}
                <button className="button" onClick={addPage}>Add Page</button>
                <button className="button" onClick={() => deletePage([currentPage.id])} disabled={pages.length === 1}>Delete Page</button>
            </div>
        )
    }
}
