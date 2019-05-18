import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

const MenuAppBar = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="fixed" elevation={0}>
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Presentation App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar variant="dense" />
        </div>
    )
}

export default MenuAppBar
