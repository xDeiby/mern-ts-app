import { put, call, takeLatest } from 'redux-saga/effects';
import {
    addFailure,
    addSuccess,
    EActionExperiments,
    loadFailureExperiments,
    loadSuccessExperiments,
} from '.';
import { IExperiment } from '../../../model/experiment';
import { IRequestStore } from '../../../model/stores';
import api from '../../../utils/api.config';

// Requests functions
function* getExperiments(action: any) {
    try {
        const response: IRequestStore<IExperiment[]> = yield call(
            api.get,
            `experiments?aviables=${action.payload}`
        );
        yield put(loadSuccessExperiments(response.data));
    } catch (error) {
        yield put(loadFailureExperiments());
    }
}

function* addExperiment(action: any) {
    try {
        const response: IRequestStore<IExperiment> = yield call(
            api.post,
            `experiments`,
            action.payload
        );

        yield put(addSuccess(response.data));
    } catch (error) {
        yield put(addFailure());
    }
}

// Watchers
export function* getExperimentsWatcher(): any {
    yield takeLatest(EActionExperiments.LOAD_REQUEST, getExperiments);
}

export function* createExperimentWatcher(): any {
    yield takeLatest(EActionExperiments.ADD_REQUEST, addExperiment);
}
