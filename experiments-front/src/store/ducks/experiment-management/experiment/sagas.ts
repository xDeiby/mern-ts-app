import { call, put, takeLatest } from 'redux-saga/effects';
import {
    EActionExperimentManagement,
    loadFailureExperimentManage,
    loadSuccessExperimentManage,
    modifyExperimentFailure,
    modifyExperimentSuccess,
} from '.';
import { IExperiment } from '../../../../model/experiment';
import { IRequestStore } from '../../../../model/stores';
import api from '../../../../utils/api.config';

// Functions
function* getExperiment(action: any) {
    try {
        const response: IRequestStore<IExperiment> = yield call(
            api.get,
            `experiments/${action.payload}`
        );
        yield put(loadSuccessExperimentManage(response.data));
    } catch (error) {
        yield put(loadFailureExperimentManage());
    }
}

function* modifyExperiment(action: any) {
    try {
        const response: IRequestStore<IExperiment> = yield call(
            api.put,
            `experiments/${action.payload.id}`,
            action.payload
        );
        yield put(modifyExperimentSuccess(response.data));
    } catch (error) {
        yield put(modifyExperimentFailure());
    }
}

// Watchers
export function* getExperimentManageWatcher(): any {
    yield takeLatest(EActionExperimentManagement.LOAD_REQUEST, getExperiment);
}

export function* modifyExperimentManageWatcher(): any {
    yield takeLatest(
        EActionExperimentManagement.MODIFY_REQUEST,
        modifyExperiment
    );
}
