import { call, put, takeLatest } from 'redux-saga/effects';
import {
    addFailureSection,
    addSuccessSection,
    EActionSections,
    loadFailureSections,
    loadSuccessSections,
    modifyFailureSection,
    modifySuccessSection,
    removeFailureSection,
    removeSuccessSection,
} from '.';
import { ISection } from '../../../../model/experiment';
import { IRequestStore } from '../../../../model/stores';
import api from '../../../../utils/api.config';
import { loadQuestions } from '../questions';

// Functions
function* getSectionsByExperiment(action: any) {
    try {
        const response: IRequestStore<ISection[]> = yield call(
            api.get,
            `sections?experimentId=${action.payload}`
        );
        yield put(loadSuccessSections(response.data));
    } catch (error) {
        yield put(loadFailureSections());
    }
}

function* modifySection(action: any) {
    try {
        const response: IRequestStore<ISection> = yield call(
            api.put,
            `sections/${action.payload.id}`,
            action.payload
        );
        yield put(modifySuccessSection(response.data));
    } catch (error) {
        yield put(modifyFailureSection());
    }
}

function* addSection(action: any) {
    try {
        const response: IRequestStore<ISection> = yield call(
            api.post,
            'sections',
            action.payload
        );
        yield put(addSuccessSection(response.data));
        yield put(loadQuestions(action.payload.experiment));
    } catch (error) {
        yield put(addFailureSection());
    }
}

function* removeSection(action: any) {
    try {
        yield call(api.delete, `sections/${action.payload.id}`);
        yield put(removeSuccessSection(action.payload));
    } catch (error) {
        yield put(removeFailureSection());
    }
}

// Watchers
export function* getSectionManageWatcher(): any {
    yield takeLatest(EActionSections.LOAD_REQUEST, getSectionsByExperiment);
}

export function* modifySectionManageWatcher(): any {
    yield takeLatest(EActionSections.MODIFY_REQUEST, modifySection);
}

export function* addSectionManageWatcher(): any {
    yield takeLatest(EActionSections.ADD_REQUEST, addSection);
}

export function* removeSectionManageWatcher(): any {
    yield takeLatest(EActionSections.REMOVE_REQUEST, removeSection);
}
