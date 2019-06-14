import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Bar from './Bar'
import { AddBlockBtn, DesignBtn, PreviewBtn } from '../buttons'
import ''
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    center: {
        marginLeft: 10,
        padding: 6,
    },
    menu: {
        borderRight: 'solid 1px gray'
    }
}))

const Toolbar = ({
    pageMode,
    togglePageMode,
    currentBlock,
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
                    <Grid container>
                        <Grid className={classes.menu} item>
                            {pageMode === 'preview' ?
                                <DesignBtn toggleMode={togglePageMode} /> :
                                <PreviewBtn toggleMode={togglePageMode} />
                            }
                            <AddBlockBtn
                                currentPage={currentPage}
                                blocks={blocks}
                                addBlock={addBlock}
                            />
                        </Grid>
                        <Grid item>
                            dfd
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Bar>
    )
}

export default Toolbar
