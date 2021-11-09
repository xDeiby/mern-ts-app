import { Reducer } from "react";
import { action } from "typesafe-actions";
import { ILogChanges } from "../../../../model/experiment";
import { IAction, IRequestStore } from "../../../../model/stores";

// Action Types
export enum ELogsActionTypes {
    MODIFY_REQUEST = "@log-management/MODIFY_REQUEST",
    MODIFY_SUCCESS = "@log-management/MODIFY_SUCCESS",
    MODIFY_FAILURE = "@log-management/MODIFY_FAILURE",
    CREATE_REQUEST = "@log-management/CREATE_REQUEST",
    CREATE_SUCCESS = "@log-management/CREATE_SUCCESS",
    CREATE_FAILURE = "@log-management/CREATE_FAILURE",
}

// Action creators
const loadRequestCreateLogs = (idExperiment: string) =>
    action(ELogsActionTypes.CREATE_REQUEST, idExperiment);

const loadSuccesstCreateLogs = (log: ILogChanges) =>
    action(ELogsActionTypes.CREATE_SUCCESS, log);

const loadFailureCreateLogs = () => action(ELogsActionTypes.CREATE_FAILURE);

const modifyLogRequest = (log: ILogChanges) =>
    action(ELogsActionTypes.MODIFY_REQUEST, log);

const modifyLogSuccess = (log: ILogChanges) =>
    action(ELogsActionTypes.MODIFY_SUCCESS, log);

const modifyLogFailure = () => action(ELogsActionTypes.MODIFY_FAILURE);

export {
    loadRequestCreateLogs,
    loadSuccesstCreateLogs,
    loadFailureCreateLogs,
    modifyLogRequest,
    modifyLogSuccess,
    modifyLogFailure,
};

// Reducer
const defaultLog: IRequestStore<ILogChanges> = {
    data: {} as ILogChanges,
    loading: false,
    error: false,
};

const logChangesReducer: Reducer<
    IRequestStore<ILogChanges>,
    IAction<ELogsActionTypes, ILogChanges>
> = (state = defaultLog, action) => {
    switch (action.type) {
        case ELogsActionTypes.MODIFY_REQUEST:
        case ELogsActionTypes.CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ELogsActionTypes.MODIFY_SUCCESS:
        case ELogsActionTypes.CREATE_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: false,
            };

        case ELogsActionTypes.MODIFY_FAILURE:
        case ELogsActionTypes.CREATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};

export default logChangesReducer;
