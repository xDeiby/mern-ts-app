import { put, call, takeLatest } from 'redux-saga/effects';
import {
    AnswerElements,
    createExecutionExperimentFailure,
    createExecutionExperimentSuccess,
    EActionExecutionExperiment,
    loadExperimentElementsFailure,
    loadExperimentElementsSuccess,
    modifyExecutionExperimentFailure,
    modifyExecutionExperimentSuccess,
} from '.';
import { IExecutionExperiment } from '../../../model/experiment/IExecutionExperiment';
import { IRequestStore } from '../../../model/stores';
import api from '../../../utils/api.config';

// Requests functions
function* getExecutionExperiment(action: any) {
    try {
        const response: IRequestStore<AnswerElements> = yield call(
            api.get,
            `answers/model/${action.payload}`
        );
        yield put(loadExperimentElementsSuccess(response.data));
    } catch (error) {
        yield put(loadExperimentElementsFailure());
    }
}

function* createAnswer(action: any) {
    // TODO: Usuario desde front
    try {
        const elements = action.payload as IExecutionExperiment;
        const result: IRequestStore<IExecutionExperiment> = yield call(
            api.post,
            'answers',
            {
                userName: elements.userName,
                experiment: elements.experiment.id,
                surveys: JSON.stringify(elements.surveys),
                quizzes: JSON.stringify(elements.quizzes),
            }
        );

        yield put(createExecutionExperimentSuccess(result.data));
    } catch (error) {
        yield put(createExecutionExperimentFailure());
    }
}

function* modifyExecutionExperiment(action: any) {
    try {
        const modifiedExp: IRequestStore<IExecutionExperiment> = yield call(
            api.put,
            `answers/${action.payload.id}`,
            action.payload
        );

        yield put(modifyExecutionExperimentSuccess(modifiedExp.data));
    } catch (error) {
        yield put(modifyExecutionExperimentFailure());
    }
}

// Watchers
export function* getExperimentExecutionWatcher(): any {
    yield takeLatest(
        EActionExecutionExperiment.LOAD_REQUEST,
        getExecutionExperiment
    );
}

export function* createExperimentInstanceWatcher(): any {
    yield takeLatest(EActionExecutionExperiment.CREATE_REQUEST, createAnswer);
}

export function* modifyExperimentInstanceWatcher(): any {
    yield takeLatest(
        EActionExecutionExperiment.MODIFY_REQUEST,
        modifyExecutionExperiment
    );
}
