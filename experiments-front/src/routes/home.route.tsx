// Components
import Home from '../components/home';
import { Routes } from '../utils/routes.config';

// Librarys
import * as React from 'react';
import { Route } from 'react-router';

// Route
const HomeRoute: React.FunctionComponent = () => {
    return (
        <Route exact path={Routes.home}>
            <Home />
        </Route>
    );
};

export default HomeRoute;
