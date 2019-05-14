import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Card } from '@material-ui/core'
import { Page } from '../page/Page'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(() => ({
    card: {
        minWidth: 150,
    },
    actions: {
        cursor: 'pointer',
        position: 'absolute',
        right: 10,
        bottom: 10
    }
}))

const Slide = ({ page, index, deletePage, enableDelete }) => {
    const [ hovered, setHovered ] = useState(false)
    const classes = useStyles()

    const handleDeletePage = ev => {
        ev.preventDefault()
        ev.stopPropagation()

        deletePage([page.id])
    }

    const renderSlideActions = () =>
        <div className={classes.actions}>
            { enableDelete ?
                <div onClick={handleDeletePage}><DeleteIcon /></div>
                : null }
        </div>

    return (
        <div style={{position: 'relative'}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Grid container>
                <Grid item xs={1}>
                    <Typography variant="body1" component="h4">
                        {index}
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <Card className={classes.card} square={true}>
                        <Page
                            id={page.id}
                            mode="preview"
                            blocks={page.blocks}
                            height="140px"
                        />
                    </Card>
                </Grid>
                { hovered ? renderSlideActions() : null }
            </Grid>
        </div>
    )
}

export default Slide
