import { put, call, takeLatest } from 'redux-saga/effects';
import {
    createSuccessModel,
    createFailureModel,
    EActionModelTypes,
    loadFailureModels,
    loadSuccessModels,
} from '.';
import { IModelType } from '../../../model/experiment';
import { IRequestStore } from '../../../model/stores';
import api from '../../../utils/api.config';

// Requests functions
function* getModelTypes(action: any) {
    const filter =
        action.payload !== undefined
            ? action.payload
                ? '?aviables=true'
                : '?aviables=false'
            : '';
    try {
        const response: IRequestStore<IModelType[]> = yield call(
            api.get,
            `model_types${filter}`
        );
        yield put(loadSuccessModels(response.data));
    } catch (error) {
        yield put(loadFailureModels());
    }
}

function* createNewModel(action: any) {
    try {
        const response: IRequestStore<IModelType> = yield call(
            api.post,
            `model_types`,
            { name: action.payload }
        );
        yield put(createSuccessModel(response.data));
    } catch (error) {
        yield put(createFailureModel());
    }
}
// Watchers
export function* getModelTypesWatcher(): any {
    yield takeLatest(EActionModelTypes.LOAD_REQUEST, getModelTypes);
}

export function* createModelWatcher(): any {
    yield takeLatest(EActionModelTypes.CREATE_REQUEST, createNewModel);
}
