import { Reducer } from 'redux';
import { action } from 'typesafe-actions';
import { IImageModel } from '../../../../model/experiment';
import { IAction, IRequestStore } from '../../../../model/stores';

// Action Types
export enum EActionImagesManagement {
    LOAD_REQUEST = '@image-management/LOAD_REQUEST',
    LOAD_SUCCESS = '@image-management/LOAD_SUCCESS',
    LOAD_FAILURE = '@image-management/LOAD_FAILURE',
    MODIFY_REQUEST = '@image-management/MODIFY_REQUEST',
    MODIFY_SUCCESS = '@image-management/MODIFY_SUCCESS',
    MODIFY_FAILURE = '@image-management/MODIFY_FAILURE',
    REMOVE_REQUEST = '@image-management/REMOVE_REQUEST',
    REMOVE_SUCCESS = '@image-management/REMOVE_SUCCESS',
    REMOVE_FAILURE = '@image-management/REMOVE_FAILURE',
    CREATE_REQUEST = '@image-management/CREATE_REQUEST',
    CREATE_SUCCESS = '@image-management/CREATE_SUCCESS',
    CREATE_FAILURE = '@image-management/CREATE_FAILURE',
}

// Action creators

// Get
const loadRequestImagesManage = (idExperiment: string) =>
    action(EActionImagesManagement.LOAD_REQUEST, idExperiment);

const loadSuccessImagesManage = (images: IImageModel[]) => {
    return action(EActionImagesManagement.LOAD_SUCCESS, images);
};

// Modify
const loadFailureImageManage = () =>
    action(EActionImagesManagement.LOAD_FAILURE);

const modifyImageRequest = (image: { data: FormData; id: string }) =>
    action(EActionImagesManagement.MODIFY_REQUEST, image);

const modifyImageSuccess = (image: IImageModel) =>
    action(EActionImagesManagement.MODIFY_SUCCESS, image);

const modifyImageFailure = () => action(EActionImagesManagement.MODIFY_FAILURE);

// Remove
const removeImageRequest = (idImage: string) =>
    action(EActionImagesManagement.REMOVE_REQUEST, idImage);

const removeImageSuccess = (idImage: string) =>
    action(EActionImagesManagement.REMOVE_SUCCESS, idImage);

const removeImageFailure = () => action(EActionImagesManagement.REMOVE_FAILURE);

// Create
const createImageRequest = (imageData: FormData) =>
    action(EActionImagesManagement.CREATE_REQUEST, imageData);

const createImageSuccess = (image: IImageModel) =>
    action(EActionImagesManagement.CREATE_SUCCESS, image);

const createImageFailure = () => action(EActionImagesManagement.CREATE_SUCCESS);

export {
    loadRequestImagesManage,
    loadSuccessImagesManage,
    loadFailureImageManage,
    modifyImageRequest,
    modifyImageSuccess,
    modifyImageFailure,
    removeImageRequest,
    removeImageSuccess,
    removeImageFailure,
    createImageRequest,
    createImageSuccess,
    createImageFailure,
};

// Reducer
const defaultImages: IRequestStore<IImageModel[]> = {
    data: [] as IImageModel[],
    loading: false,
    error: false,
};

const imageManagementReducer: Reducer<
    IRequestStore<IImageModel[]>,
    IAction<EActionImagesManagement, IImageModel[] | IImageModel | string>
> = (state = defaultImages, action) => {
    switch (action.type) {
        case EActionImagesManagement.CREATE_REQUEST:
        case EActionImagesManagement.REMOVE_REQUEST:
        case EActionImagesManagement.MODIFY_REQUEST:
        case EActionImagesManagement.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case EActionImagesManagement.LOAD_SUCCESS:
            return {
                data: action.payload as IImageModel[],
                loading: false,
                error: false,
            };

        case EActionImagesManagement.CREATE_FAILURE:
        case EActionImagesManagement.REMOVE_FAILURE:
        case EActionImagesManagement.MODIFY_FAILURE:
        case EActionImagesManagement.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case EActionImagesManagement.MODIFY_SUCCESS:
            const modify = action.payload as IImageModel;
            return {
                data: [
                    ...state.data.filter((img) => img.id !== modify.id),
                    modify,
                ],
                loading: false,
                error: false,
            };
        case EActionImagesManagement.REMOVE_SUCCESS:
            const removedId = action.payload as string;
            return {
                data: state.data.filter((img) => img.id !== removedId),
                loading: false,
                error: false,
            };

        case EActionImagesManagement.CREATE_SUCCESS:
            const newImage = action.payload as IImageModel;
            return {
                data: [...state.data, newImage],
                loading: false,
                error: false,
            };
        default:
            return state;
    }
};

export default imageManagementReducer;
