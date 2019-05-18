import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    }
}))

const PreviewBtn = ({ toggleMode }) => {
    const classes = useStyles()

    return (
        <Button onClick={toggleMode} variant="outlined" size="small" className={classes.button}>
            Design
            <Edit className={classes.rightIcon} />
        </Button>
    )
}

export default PreviewBtn