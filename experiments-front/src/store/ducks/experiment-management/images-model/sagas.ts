import {
    createImageFailure,
    createImageSuccess,
    EActionImagesManagement,
    loadFailureImageManage,
    loadSuccessImagesManage,
    modifyImageFailure,
    modifyImageSuccess,
    removeImageFailure,
    removeImageSuccess,
} from '.';
import { IImageModel } from '../../../../model/experiment';
import api from '../../../../utils/api.config';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IRequestStore } from '../../../../model/stores';

// Functions
function* getImagesByExperiment(action: any) {
    try {
        const response: IRequestStore<IImageModel[]> = yield call(
            api.get,
            `images?experimentId=${action.payload}`
        );
        yield put(loadSuccessImagesManage(response.data));
    } catch (error) {
        yield put(loadFailureImageManage());
    }
}

function* removeImage(action: any) {
    try {
        yield call(api.delete, `images/${action.payload}`);
        yield put(removeImageSuccess(action.payload));
    } catch (error) {
        yield put(removeImageFailure());
    }
}

function* createImage(action: any) {
    try {
        const response: IRequestStore<IImageModel> = yield call(
            api.post,
            'images',
            action.payload
        );
        yield put(createImageSuccess(response.data));
    } catch (error) {
        yield put(createImageFailure());
    }
}

function* modifyImage(action: any) {
    try {
        const response: IRequestStore<IImageModel> = yield call(
            api.put,
            `images/${action.payload.id}`,
            action.payload.data
        );
        yield put(modifyImageSuccess(response.data));
    } catch (error) {
        yield put(modifyImageFailure());
    }
}

// Watchers
export function* getImageManageWatcher(): any {
    yield takeLatest(
        EActionImagesManagement.LOAD_REQUEST,
        getImagesByExperiment
    );
}

export function* modifyImageManageWatcher(): any {
    yield takeLatest(EActionImagesManagement.MODIFY_REQUEST, modifyImage);
}

export function* removeImageManageWatcher(): any {
    yield takeLatest(EActionImagesManagement.REMOVE_REQUEST, removeImage);
}

export function* createImageManageWatcher(): any {
    yield takeLatest(EActionImagesManagement.CREATE_REQUEST, createImage);
}
