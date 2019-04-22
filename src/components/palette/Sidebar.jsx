import React, { Component } from 'react'
import Blocks from './Components'

export default class Sidebar extends Component {
    render() {
        const { currentPage, addBlock } = this.props

        return (
            <div>
                {Object.keys(Blocks).map(block => (
                    <div key={block}>
                        <button
                            className="button"
                            onClick={() => addBlock({pageId: currentPage.id, block: Blocks[block].name})}
                        >
                            {Blocks[block].label}
                        </button>
                    </div>
                ))}
            </div>
        )
    }
}
