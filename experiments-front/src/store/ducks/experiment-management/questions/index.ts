import { Reducer } from "react";
import { action } from "typesafe-actions";
import { IQuestion } from "../../../../model/experiment";
import { IAction, IRequestStore } from "../../../../model/stores";

// Action Types
export enum EActionQuestions {
    LOAD_REQUEST = "@questions-management/LOAD_REQUEST",
    LOAD_SUCCESS = "@questions-management/LOAD_SUCCESS",
    LOAD_FAILURE = "@questions-management/LOAD_FAILURE",
    ADD_REQUEST = "@questions-management/ADD_REQUEST",
    ADD_SUCCESS = "@questions-management/ADD_SUCCESS",
    ADD_FAILURE = "@questions-management/ADD_FAILURE",
    MODIFY_REQUEST = "@questions-management/MODIFY_REQUEST",
    MODIFY_SUCCESS = "@questions-management/MODIFY_SUCCESS",
    MODIFY_FAILURE = "@questions-management/MODIFY_FAILURE",
    REMOVE_REQUEST = "@questions-management/REMOVE_REQUEST",
    REMOVE_SUCCESS = "@questions-management/REMOVE_SUCCESS",
    REMOVE_FAILURE = "@questions-management/REMOVE_FAILURE",
}

// Action creators
const loadQuestions = (idExperiment: string) =>
    action(EActionQuestions.LOAD_REQUEST, idExperiment);

const loadSuccessQuestions = (questions: IQuestion[]) => {
    sessionStorage.setItem("original_questions", JSON.stringify(questions));

    return action(EActionQuestions.LOAD_SUCCESS, questions);
};

const loadFailureQuestions = () => action(EActionQuestions.LOAD_FAILURE);

const addRequestQuestion = (question: Omit<IQuestion, "id">) =>
    action(EActionQuestions.ADD_REQUEST, question);

const addSuccessQuestion = (question: IQuestion) =>
    action(EActionQuestions.ADD_SUCCESS, question);

const addFailureQuestion = () => action(EActionQuestions.ADD_FAILURE);

const modifyRequestQuestion = (question: IQuestion) =>
    action(EActionQuestions.MODIFY_REQUEST, question);

const modifySuccessQuestion = (question: IQuestion) =>
    action(EActionQuestions.MODIFY_SUCCESS, question);

const modifyFailureQuestion = () => action(EActionQuestions.MODIFY_FAILURE);

const removeRequestQuestion = (question: IQuestion) =>
    action(EActionQuestions.REMOVE_REQUEST, question);

const rmeoveSuccessQuestion = (question: IQuestion) =>
    action(EActionQuestions.REMOVE_SUCCESS, question);

const removeFailureQuestion = () => action(EActionQuestions.REMOVE_FAILURE);

export {
    loadQuestions,
    loadSuccessQuestions,
    loadFailureQuestions,
    addRequestQuestion,
    addSuccessQuestion,
    addFailureQuestion,
    modifyRequestQuestion,
    modifySuccessQuestion,
    modifyFailureQuestion,
    removeRequestQuestion,
    rmeoveSuccessQuestion,
    removeFailureQuestion,
};

// Reducer
const defaultQuestions: IRequestStore<IQuestion[]> = {
    data: [] as IQuestion[],
    loading: false,
    error: false,
};

const questionManagementReducer: Reducer<
    IRequestStore<IQuestion[]>,
    IAction<EActionQuestions, IQuestion[] | IQuestion>
> = (state = defaultQuestions, action) => {
    switch (action.type) {
        case EActionQuestions.REMOVE_REQUEST:
        case EActionQuestions.MODIFY_REQUEST:
        case EActionQuestions.ADD_REQUEST:
        case EActionQuestions.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case EActionQuestions.LOAD_SUCCESS:
            return {
                data: action.payload as IQuestion[],
                loading: false,
                error: false,
            };

        case EActionQuestions.REMOVE_FAILURE:
        case EActionQuestions.MODIFY_FAILURE:
        case EActionQuestions.ADD_FAILURE:
        case EActionQuestions.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case EActionQuestions.MODIFY_SUCCESS:
            const question_m = action.payload as IQuestion;
            return {
                data: state.data.reduce<IQuestion[]>(
                    (questions, question) => [
                        ...questions,
                        question.id === question_m.id ? question_m : question,
                    ],
                    []
                ),
                loading: false,
                error: false,
            };

        case EActionQuestions.ADD_SUCCESS:
            return {
                data: [...state.data, action.payload as IQuestion],
                loading: false,
                error: false,
            };

        case EActionQuestions.REMOVE_SUCCESS:
            const question_rm = action.payload as IQuestion;
            return {
                data: state.data.filter(
                    (question) => question.id !== question_rm.id
                ),
                loading: false,
                error: false,
            };

        default:
            return state;
    }
};

export default questionManagementReducer;
