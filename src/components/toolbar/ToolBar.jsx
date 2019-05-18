import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Bar from './Bar'
import { AddBlockBtn, DesignBtn, PreviewBtn } from '../buttons'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    center: {
        marginLeft: 10,
        paddingRight: 5
    }
}))

const Toolbar = ({
    pageMode,
    togglePageMode,
    currentPage,
    blocks,
    addBlock
}) => {
    const classes = useStyles()

    return (
        <Bar className={classes.root}>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid className={classes.center} item xs={8}>
                    <AddBlockBtn currentPage={currentPage} blocks={blocks} addBlock={addBlock} />
                    { pageMode === 'preview' ?
                        <DesignBtn toggleMode={togglePageMode} /> :
                        <PreviewBtn toggleMode={togglePageMode} />
                    }
                </Grid>
            </Grid>
        </Bar>
    )
}

export default Toolbar
