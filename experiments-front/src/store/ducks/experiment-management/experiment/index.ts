import { Reducer } from "react";
import { action } from "typesafe-actions";
import { IExperiment } from "../../../../model/experiment";
import { IAction, IRequestStore } from "../../../../model/stores";

// Action Types
export enum EActionExperimentManagement {
    LOAD_REQUEST = "@experiment-management/LOAD_REQUEST",
    LOAD_SUCCESS = "@experiment-management/LOAD_SUCCESS",
    LOAD_FAILURE = "@experiment-management/LOAD_FAILURE",
    MODIFY_REQUEST = "@experiment-management/MODIFY_REQUEST",
    MODIFY_SUCCESS = "@experiment-management/MODIFY_SUCCESS",
    MODIFY_FAILURE = "@experiment-management/MODIFY_FAILURE",
}

// Action creators
const loadRequestExperimentManage = (idExperiment: string) =>
    action(EActionExperimentManagement.LOAD_REQUEST, idExperiment);

const loadSuccessExperimentManage = (experiment: IExperiment) => {
    sessionStorage.setItem("original_experiment", JSON.stringify(experiment));

    return action(EActionExperimentManagement.LOAD_SUCCESS, experiment);
};

const loadFailureExperimentManage = () =>
    action(EActionExperimentManagement.LOAD_FAILURE);
const modifyExperimentRequest = (experiment: IExperiment) =>
    action(EActionExperimentManagement.MODIFY_REQUEST, experiment);

const modifyExperimentSuccess = (experiment: IExperiment) =>
    action(EActionExperimentManagement.MODIFY_SUCCESS, experiment);

const modifyExperimentFailure = () =>
    action(EActionExperimentManagement.MODIFY_FAILURE);

export {
    loadRequestExperimentManage,
    loadSuccessExperimentManage,
    loadFailureExperimentManage,
    modifyExperimentRequest,
    modifyExperimentSuccess,
    modifyExperimentFailure,
};

// Reducer
const defaultExperiment: IRequestStore<IExperiment> = {
    data: {} as IExperiment,
    loading: false,
    error: false,
};

const experimentManagementReducer: Reducer<
    IRequestStore<IExperiment>,
    IAction<EActionExperimentManagement, IExperiment>
> = (state = defaultExperiment, action) => {
    switch (action.type) {
        case EActionExperimentManagement.MODIFY_REQUEST:
        case EActionExperimentManagement.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case EActionExperimentManagement.MODIFY_SUCCESS:
        case EActionExperimentManagement.LOAD_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: false,
            };

        case EActionExperimentManagement.MODIFY_FAILURE:
        case EActionExperimentManagement.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};

export default experimentManagementReducer;
