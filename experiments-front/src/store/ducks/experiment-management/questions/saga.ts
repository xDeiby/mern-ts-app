import { call, put, takeLatest } from 'redux-saga/effects';
import {
    addFailureQuestion,
    addSuccessQuestion,
    EActionQuestions,
    loadFailureQuestions,
    loadSuccessQuestions,
    modifyFailureQuestion,
    modifySuccessQuestion,
    removeFailureQuestion,
    rmeoveSuccessQuestion,
} from '.';
import { IQuestion } from '../../../../model/experiment';
import { IRequestStore } from '../../../../model/stores';
import api from '../../../../utils/api.config';

// Functions
function* getQuestionsByExperiment(action: any) {
    try {
        const response: IRequestStore<IQuestion[]> = yield call(
            api.get,
            `questions?experimentId=${action.payload}`
        );
        yield put(loadSuccessQuestions(response.data));
    } catch (error) {
        yield put(loadFailureQuestions());
    }
}

function* modifyQuestion(action: any) {
    try {
        const response: IRequestStore<IQuestion> = yield call(
            api.put,
            `questions/${action.payload.id}`,
            action.payload
        );
        yield put(modifySuccessQuestion(response.data));
    } catch (error) {
        yield put(modifyFailureQuestion());
    }
}

function* addQuestion(action: any) {
    try {
        const response: IRequestStore<IQuestion> = yield call(
            api.post,
            'questions',
            action.payload
        );
        yield put(addSuccessQuestion(response.data));
    } catch (error) {
        yield put(addFailureQuestion());
    }
}

function* removeQuestion(action: any) {
    try {
        yield call(api.delete, `questions/${action.payload.id}`);
        yield put(rmeoveSuccessQuestion(action.payload));
    } catch (error) {
        yield put(removeFailureQuestion());
    }
}

// Watchers
export function* getQuestionManageWatcher(): any {
    yield takeLatest(EActionQuestions.LOAD_REQUEST, getQuestionsByExperiment);
}

export function* modifyQuestionManageWatcher(): any {
    yield takeLatest(EActionQuestions.MODIFY_REQUEST, modifyQuestion);
}

export function* addQuestionManageWatcher(): any {
    yield takeLatest(EActionQuestions.ADD_REQUEST, addQuestion);
}

export function* removeQuestionManageWatcher(): any {
    yield takeLatest(EActionQuestions.REMOVE_REQUEST, removeQuestion);
}
