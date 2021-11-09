import { call, put, takeLatest } from 'redux-saga/effects';
import {
    ELogsActionTypes,
    modifyLogFailure,
    modifyLogSuccess,
    loadSuccesstCreateLogs,
    loadFailureCreateLogs,
} from '.';
import { ILogChanges } from '../../../../model/experiment';
import { IRequestStore } from '../../../../model/stores';
import api from '../../../../utils/api.config';

// Functions
function* modifyLog(action: any) {
    try {
        const response: IRequestStore<ILogChanges> = yield call(
            api.put,
            `logs/${action.payload.id}`,
            action.payload
        );
        yield put(modifyLogSuccess(response.data));
    } catch (error) {
        yield put(modifyLogFailure());
    }
}

function* newLog(action: any) {
    try {
        const defaultModify: Omit<ILogChanges, 'id'> = {
            name: 'Nueva modificación menor',
            typeChanges: 'SHORT_CHANGES',
            experiment: action.payload,
        };

        const response: IRequestStore<ILogChanges> = yield call(
            api.post,
            `logs`,
            defaultModify
        );
        yield put(loadSuccesstCreateLogs(response.data));
    } catch (error) {
        yield put(loadFailureCreateLogs());
    }
}

// Watchers
export function* createLogManageWatcher(): any {
    yield takeLatest(ELogsActionTypes.CREATE_REQUEST, newLog);
}

export function* modifyLogManageWatcher(): any {
    yield takeLatest(ELogsActionTypes.MODIFY_REQUEST, modifyLog);
}
