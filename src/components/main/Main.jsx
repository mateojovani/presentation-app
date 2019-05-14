import React, { useEffect } from 'react'
import TitleBar from '../app-bar/AppBar'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Toolbar, Grid, Paper } from '@material-ui/core'
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
        flexGrow: 1,
    },
    main: {
        height: '80vh'
    },
    slides: {
        height: '80vh',
        overflowY: 'scroll'
    },
    paper: {

    }
}))


const Main = ({
    pagesReducer,
    getPages,
    setCurrentPage,
    addPage,
    deletePage,
    updateBlock,
    setActiveBlock
}) => {
    useEffect(() => { getPages() }, [])

    const classes = useStyles()
    const pages = pagesReducer.pages ? pagesReducer.pages : []
    const currentPage = pagesReducer.currentPage ? pagesReducer.currentPage : { blocks: [] }
    const currentBlock = pagesReducer.currentBlock || null

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <TitleBar />
                <Toolbar variant="dense"/>
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
                                mode="edit"
                                blocks={currentPage.blocks}
                                currentBlock={currentBlock}
                                updateBlock={updateBlock.bind(this)}
                                setActiveBlock={setActiveBlock.bind(this)}
                            />
                        </Paper>
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
    addBlock: (pageId) => dispatch(addBlock(pageId))
})

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)
