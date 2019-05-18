import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    }
}))

const Bar = ({children}) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={1}>
                <Toolbar variant="dense">
                    {children}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Bar
