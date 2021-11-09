// Components
import AppBarE, { IAppButton } from '../components/app-bar';
import { Routes } from '../utils/routes.config';

// Librarys
import * as React from 'react';
import CustomizedTables from '../components/export-experiment/table';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
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
const ExportRoute: React.FunctionComponent = () => {
    return (
        <Route exact path={Routes.export}>
            <AppBarE title={'Exportación de datos'} buttons={buttons}>
                <CustomizedTables />
            </AppBarE>
        </Route>
    );
};

export default ExportRoute;
