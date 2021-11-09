// Components
import AppBarE, { IAppButton } from '../components/app-bar';
import HomeIcon from '@material-ui/icons/Home';
import ListExperiment from '../components/list-experiments';
import { Routes } from '../utils/routes.config';

// Librarys
import * as React from 'react';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Route } from 'react-router';

// Buttons
const buttons: IAppButton[] = [
    {
        name: 'Inicio',
        path: Routes.home,
        icon: <HomeIcon />,
    },
    {
        name: 'Ejecutar Experimento',
        path: Routes.execution,
        icon: <ListAltIcon />,
    },
    {
        name: 'Exportar Experimentos',
        path: Routes.export,
        icon: <ImportExportIcon />,
    },
];

// Route
const ExperimentsRoute: React.FunctionComponent = () => {
    return (
        <Route exact path={Routes.experiments}>
            <>
                <AppBarE title={'Experimentos'} buttons={buttons}>
                    <ListExperiment />
                </AppBarE>
            </>
        </Route>
    );
};

export default ExperimentsRoute;
