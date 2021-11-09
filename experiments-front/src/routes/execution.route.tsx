// Components
import { Routes } from '../utils/routes.config';

// Librarys
import * as React from 'react';
import { Route } from 'react-router';
import { ExecutionExperiment } from '../components/execution-experiment';

// Buttons
// const buttons: IAppButton[] = [
//     {
//         name: 'Inicio',
//         path: Routes.home,
//         icon: <HomeIcon />,
//     },
// ];

// Route
const ExecutionRoute: React.FunctionComponent = () => {
    return (
        <Route exact path={[Routes.execution, `${Routes.execution}/:id`]}>
            <ExecutionExperiment />
        </Route>
    );
};

export default ExecutionRoute;
