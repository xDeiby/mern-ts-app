// Components
import MenuBar from './MenuBar';

// Librarys
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router';
import { Routes } from '../../utils/routes.config';

// Model
interface IAppBarE {
    children: React.ReactNode;
    buttons: IAppButton[];
    title: string;
}

export interface IAppButton {
    name: string;
    icon: ReactNode;
    path: Routes;
}

// Styles
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

// Component App Bar
export default function AppBarE({ children, buttons, title }: IAppBarE) {
    // Styles
    const classes = useStyles();

    // States
    const [state, setState] = React.useState(false);

    const history = useHistory();

    // Method of action listener
    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState(open);
        };

    // Method to return list buttons
    const list = (app_buttons: IAppButton[]) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {app_buttons.map(({ name, icon, path }) => (
                    <ListItem
                        onClick={() => history.push(path)}
                        button
                        key={name}
                    >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                {/* <Button onClick={toggleDrawer(true)}>{"left"}</Button> */}

                {/* Bar */}
                <MenuBar
                    title={title}
                    openBar={() => {
                        setState(true);
                    }}
                />

                {/* Content of page */}
                {children}

                {/* Buttons List */}
                <SwipeableDrawer
                    anchor={'left'}
                    open={state}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list(buttons)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
