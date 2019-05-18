import React, { useEffect, useState } from 'react'
import TitleBar from '../app-bar/AppBar'
import AppToolBar from '../toolbar/ToolBar'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Grid, Paper } from '@material-ui/core'
import Slides from '../slides-panel/Slides'
import DropTargetPage from '../page/Page'
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
import Blocks from '../page/blocks/Components'

const theme = createMuiTheme({
    palette: {
        primary: { main: '#FFFFFF' },
        secondary: { main: '#2c3e50' }
    }
})

const useStyles = makeStyles(() => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    },
    root: {
        zIndex: 1,
        flexGrow: 1,
        height: '100vh'
    },
    main: {

    },
    slides: {
        height: '80vh',
        overflowY: 'scroll'
    },
    paper: {
        zIndex: 0,
        marginLeft: 30,
        marginTop: 30,
        marginBottom: '5vh'
    }
}))


const Main = ({
    pagesReducer,
    getPages,
    setCurrentPage,
    addPage,
    deletePage,
    addBlock,
    updateBlock,
    setActiveBlock
}) => {
    useEffect(() => { getPages() }, [])
    let [mode, setMode] = useState('edit')

    const togglePageMode = () => {
        if (mode === 'edit')
            setMode('preview')
        else
            setMode('edit')
    }

    const classes = useStyles()
    const pages = pagesReducer.pages ? pagesReducer.pages : []
    const currentPage = pagesReducer.currentPage ? pagesReducer.currentPage : { blocks: [] }
    const currentBlock = pagesReducer.currentBlock || null

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <TitleBar />
                <AppToolBar
                    pageMode={mode}
                    togglePageMode={togglePageMode}
                    blocks={Blocks}
                    addBlock={addBlock.bind(this)}
                    currentPage={currentPage}
                />
                <Grid className={classes.main} container>
                    <Grid className={classes.slides} item xs={2}>
                        <Slides
                            pages={pages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage.bind(this)}
                            addPage={addPage.bind(this)}
                            deletePage={deletePage.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paper} square={true}>
                            <DropTargetPage
                                id={currentPage.id}
                                mode={mode}
                                height='72vh'
                                blocks={currentPage.blocks}
                                currentBlock={currentBlock}
                                updateBlock={updateBlock.bind(this)}
                                setActiveBlock={setActiveBlock.bind(this)}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    )
}

const mapDispatchToProps = dispatch => ({
    getPages: () => dispatch(getPages()),
    updateBlock: (params) => dispatch(updateBlock(params)),
    setActiveBlock: (params) => dispatch(setActiveBlock(params)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    addPage: () => dispatch(addPage()),
    deletePage: (pageIds) => dispatch(deletePage(pageIds)),
    addBlock: (params) => dispatch(addBlock(params))
})

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)
