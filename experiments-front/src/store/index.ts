import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddelware from 'redux-saga';
import {
    IExperiment,
    IImageModel,
    ILogChanges,
    IModelType,
    IQuestion,
    ISection,
} from '../model/experiment';
import { IExecutionExperiment } from '../model/experiment/IExecutionExperiment';
import { IStepModel } from '../model/stepper-model';
import { IRequestStore } from '../model/stores';
import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

// Store Model
export interface ApplicationState {
    modelTypes: IRequestStore<IModelType[]>;
    experiments: IRequestStore<IExperiment[]>;
    experiment_manage: IRequestStore<IExperiment>;
    sections_manage: IRequestStore<ISection[]>;
    questions_manage: IRequestStore<IQuestion[]>;
    log_changes: IRequestStore<ILogChanges>;
    execution_experiment: IRequestStore<IExecutionExperiment>;
    section_steps: IStepModel;
    images_manage: IRequestStore<IImageModel[]>;
}

// Redux DevTools
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// Saga Middleware
const sagaMiddleware = createSagaMiddelware();

// Typescript Configuration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Creation Store
const store = {
    ...createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga),
};

export default store;
