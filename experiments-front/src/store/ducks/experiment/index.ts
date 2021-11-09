import { Reducer } from 'react';
import { action } from 'typesafe-actions';
import { IExperiment } from '../../../model/experiment';
import { IAction, IRequestStore } from '../../../model/stores';

// Action Types
export enum EActionExperiments {
    LOAD_REQUEST = '@experiments/LOAD_REQUEST',
    LOAD_SUCCESS = '@experiments/LOAD_SUCCESS',
    LOAD_FAILURE = '@experiments/LOAD_FAILURE',
    ADD_REQUEST = '@experiments/ADD_REQUEST',
    ADD_SUCCESS = '@experiments/ADD_SUCCESS',
    ADD_FAILURE = '@experiments/ADD_FAILURE',
}

// Action creators
const loadExperiments = (aviables: boolean) =>
    action(EActionExperiments.LOAD_REQUEST, aviables);

const loadSuccessExperiments = (experiment: IExperiment[]) =>
    action(EActionExperiments.LOAD_SUCCESS, experiment);

const loadFailureExperiments = () => action(EActionExperiments.LOAD_FAILURE);
const addRequest = (
    experiment: Omit<
        IExperiment,
        'id' | 'creationDate' | 'logModifys' | 'state'
    >
) => action(EActionExperiments.ADD_REQUEST, experiment);

const addSuccess = (experiment: IExperiment) =>
    action(EActionExperiments.ADD_SUCCESS, experiment);

const addFailure = () => action(EActionExperiments.ADD_FAILURE);

export {
    loadExperiments,
    loadSuccessExperiments,
    loadFailureExperiments,
    addRequest,
    addSuccess,
    addFailure,
};

// Reducer
const defaultExperiments: IRequestStore<IExperiment[]> = {
    data: [] as IExperiment[],
    loading: false,
    error: false,
};

const experimentReducer: Reducer<
    IRequestStore<IExperiment[]>,
    IAction<EActionExperiments, IExperiment[] | IExperiment>
> = (state = defaultExperiments, action) => {
    switch (action.type) {
        case EActionExperiments.ADD_REQUEST:
        case EActionExperiments.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case EActionExperiments.LOAD_SUCCESS:
            return {
                data: action.payload as IExperiment[],
                loading: false,
                error: false,
            };

        case EActionExperiments.ADD_FAILURE:
        case EActionExperiments.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case EActionExperiments.ADD_SUCCESS:
            return {
                data: [...state.data, action.payload as IExperiment],
                loading: false,
                error: false,
            };

        default:
            return state;
    }
};

export default experimentReducer;
