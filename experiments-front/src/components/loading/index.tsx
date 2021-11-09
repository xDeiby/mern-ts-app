import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    })
);

// Model Props
export interface ILoadingProps {
    isLoading: boolean;
    children: React.ReactNode;
}

// TODO: Produce un warning propio de material ui. No problematico (Ver mas a fondo despues)
// Component
export default function Loading(props: ILoadingProps) {
    const classes = useStyles();
    const { isLoading, children } = props;
    // return <>{isLoading ? <h2>Cargando...</h2> : children}</>;
    return isLoading ? (
        <Backdrop open={isLoading} className={classes.backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    ) : (
        <>{children}</>
    );
}
