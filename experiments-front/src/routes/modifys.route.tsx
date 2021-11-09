// Components
import AppBarE, { IAppButton } from '../components/app-bar';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import HomeIcon from '@material-ui/icons/Home';
import { Routes } from '../utils/routes.config';

// Librarys
import * as React from 'react';
import { Route } from 'react-router';
import LogExperiment from '../components/show-modifys';

// Buttons
const buttons: IAppButton[] = [
    {
        name: 'Inicio',
        path: Routes.home,
        icon: <HomeIcon />,
    },
    {
        name: 'Gestionar Experimentos',
        path: Routes.experiments,
        icon: <SettingsApplicationsIcon />,
    },
    {
        name: 'Exportar Experimentos',
        path: Routes.export,
        icon: <ImportExportIcon />,
    },
];

// Route
const ModifysRouter: React.FunctionComponent = () => {
    return (
        <Route exact path={`${Routes.modifys}/:id`}>
            <AppBarE title="Registro de cambios" buttons={buttons}>
                <LogExperiment />
            </AppBarE>
        </Route>
    );
};

export default ModifysRouter;
