// Components
import AppBarE, { IAppButton } from '../components/app-bar';
import ExperimentManage from '../components/experiment-manage';
import { Routes } from '../utils/routes.config';

// Librarys
import * as React from 'react';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import HomeIcon from '@material-ui/icons/Home';
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
        name: 'Gestionar Experimentos',
        path: Routes.experiments,
        icon: <SettingsApplicationsIcon />,
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
const ExperimentRoute: React.FunctionComponent = () => {
    const [title, setTitle] = React.useState('Administrar Experimento');

    return (
        <Route exact path={`${Routes.experiments}/:id`}>
            <AppBarE title={title} buttons={buttons}>
                <ExperimentManage setTitle={setTitle} />
            </AppBarE>
        </Route>
    );
};

export default ExperimentRoute;
