import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    Typography
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
    category: {

    },
    blockBtn: {
        padding: 30,
        margin: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}))

const BlocksMenu = ({
    open,
    scroll,
    handleClose,
    currentPage,
    addBlock,
    blocks
}) => {
    const classes = useStyles()

    return (
        <Dialog
            fullWidth={true}
            maxWidth='md'
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
        >
            <DialogTitle id="scroll-dialog-title">Add Block</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <List className={classes.root}>
                    {Object.keys(blocks).map(category => (
                        <div key={category}>
                            <Typography variant="h6" gutterBottom>
                                {category}
                            </Typography>
                            <ListItem>
                                {Object.keys(blocks[category]).map(block => (
                                    <Button
                                        key={block}
                                        variant="outlined"
                                        className={classes.blockBtn}
                                        onClick={() => {
                                            addBlock({ pageId: currentPage.id, block: block })
                                            handleClose()
                                        }}
                                    >
                                        {blocks[category][block].label}
                                    </Button>
                                ))}
                            </ListItem>
                        </div>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    )
}

const AddBlockBtn = ({ blocks, currentPage, addBlock }) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const openMenu = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <BlocksMenu
                open={open}
                scroll='paper'
                handleClose={handleClose}
                currentPage={currentPage}
                blocks={blocks}
                addBlock={addBlock}
            />
            <Button
                onClick={openMenu}
                variant="outlined"
                size="small"
                className={classes.button}
            >
                Add Block
                <Add className={classes.rightIcon} />
            </Button>
        </>
    )
}

export default AddBlockBtn
