// Librarys
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
    AppBar,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
    createStyles,
} from '@material-ui/core';

// Styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
    })
);

// Model
interface IMenuBar {
    openBar: () => void;
    title: string;
}

// TODO: Produce un warning propio de material ui. No problematico (Ver mas a fondo despues)
// Component
export default function MenuBar({ openBar, title }: IMenuBar) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => openBar()}
                        id="button-bar"
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {title}
                    </Typography>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}
