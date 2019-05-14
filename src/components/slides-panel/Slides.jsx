import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Slide from './Slide'

const useStyles = makeStyles(() => ({
    cardWrapper: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 20
    },
    card: {
        minWidth: 150,
    },
    addPage: {
        opacity: 0.5,
        cursor: 'pointer',
        margin: 3,
        borderStyle: 'dashed',
        paddingTop: 40,
        paddingBottom: 40
    },
    icon: {
        fontSize: 48
    },
    active: {
        background: '#bdc3c7'
    }
}))

const Slides = (props) => {
    const {
        pages,
        currentPage,
        setCurrentPage,
        addPage,
        deletePage
    } = props

    const classes = useStyles()

    const renderAddPage = () =>
        <div className={classes.cardWrapper} onClick={addPage}>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={11}>
                    <Card className={classes.card} square={true}>
                        <Box className={classes.addPage} border={3}>
                            <Grid container justify="center">
                                <AddIcon className={classes.icon} />
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </div>

    const renderSlides = (pages, currentPage, setCurrentPage) => {
        return pages.map((page, key) => (
            <div className={currentPage.id === page.id ? `${classes.active} ${classes.cardWrapper}` : classes.cardWrapper}
                key={key}
                onClick={() => setCurrentPage(page)}
            >
                <Slide
                    index={key + 1}
                    page={page}
                    deletePage={deletePage}
                    enableDelete={pages.length !== 1}
                />
            </div>
        ))
    }

    return (
        <div>
            {renderSlides(pages, currentPage, setCurrentPage)}
            {renderAddPage()}
        </div>
    )
}

export default Slides
