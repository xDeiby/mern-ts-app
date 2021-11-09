import { Reducer } from 'react';
import { action } from 'typesafe-actions';
import { IModelType } from '../../../model/experiment';
import { IAction, IRequestStore } from '../../../model/stores';

// Action Types
export enum EActionModelTypes {
    LOAD_REQUEST = '@modelTypes/LOAD_REQUEST',
    LOAD_SUCCESS = '@modelTypes/LOAD_SUCCESS',
    LOAD_FAILURE = '@modelTypes/LOAD_FAILURE',
    CREATE_REQUEST = '@modelTypes/CREATE_REQUEST',
    CREATE_SUCCESS = '@modelTypes/CREATE_SUCCESS',
    CREATE_FAILURE = '@modelTypes/CREATE_FAILURE',
}

// Action creators
const loadModels = (aviables?: boolean) =>
    action(EActionModelTypes.LOAD_REQUEST, aviables);
const loadSuccessModels = (models: IModelType[]) =>
    action(EActionModelTypes.LOAD_SUCCESS, models);
const loadFailureModels = () => action(EActionModelTypes.LOAD_FAILURE);

const createModelRequest = (name: string) =>
    action(EActionModelTypes.CREATE_REQUEST, name);
const createSuccessModel = (model: IModelType) =>
    action(EActionModelTypes.CREATE_SUCCESS, model);
const createFailureModel = () => action(EActionModelTypes.CREATE_FAILURE);

export {
    loadModels,
    loadSuccessModels,
    loadFailureModels,
    createModelRequest,
    createSuccessModel,
    createFailureModel,
};

// Reducer
const defaultModels: IRequestStore<IModelType[]> = {
    data: [] as IModelType[],
    loading: false,
    error: false,
};

const modelTypesReducer: Reducer<
    IRequestStore<IModelType[]>,
    IAction<EActionModelTypes, IModelType[] | IModelType>
> = (state = defaultModels, action) => {
    switch (action.type) {
        case EActionModelTypes.CREATE_REQUEST:
        case EActionModelTypes.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case EActionModelTypes.LOAD_SUCCESS:
            return {
                data: action.payload as IModelType[],
                loading: false,
                error: false,
            };

        case EActionModelTypes.CREATE_SUCCESS:
            return {
                data: [...state.data, action.payload as IModelType],
                loading: false,
                error: false,
            };

        case EActionModelTypes.CREATE_FAILURE:
        case EActionModelTypes.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};

export default modelTypesReducer;
