import { Reducer } from "react";
import { action } from "typesafe-actions";
import { ISection } from "../../../../model/experiment";
import { IAction, IRequestStore } from "../../../../model/stores";

// Action Types
export enum EActionSections {
    LOAD_REQUEST = "@sections-management/LOAD_REQUEST",
    LOAD_SUCCESS = "@sections-management/LOAD_SUCCESS",
    LOAD_FAILURE = "@sections-management/LOAD_FAILURE",
    ADD_REQUEST = "@sections-management/ADD_REQUEST",
    ADD_SUCCESS = "@sections-management/ADD_SUCCESS",
    ADD_FAILURE = "@sections-management/ADD_FAILURE",
    MODIFY_REQUEST = "@sections-management/MODIFY_REQUEST",
    MODIFY_SUCCESS = "@sections-management/MODIFY_SUCCESS",
    MODIFY_FAILURE = "@sections-management/MODIFY_FAILURE",
    REMOVE_REQUEST = "@sections-management/REMOVE_REQUEST",
    REMOVE_SUCCESS = "@sections-management/REMOVE_SUCCESS",
    REMOVE_FAILURE = "@sections-management/REMOVE_FAILURE",
}

// Action creators
const loadSections = (idExperiment: string) =>
    action(EActionSections.LOAD_REQUEST, idExperiment);

const loadSuccessSections = (sections: ISection[]) => {
    sessionStorage.setItem("original_sections", JSON.stringify(sections));

    return action(EActionSections.LOAD_SUCCESS, sections);
};

const loadFailureSections = () => action(EActionSections.LOAD_FAILURE);

const addRequestSection = (section: Omit<ISection, "id">) =>
    action(EActionSections.ADD_REQUEST, section);

const addSuccessSection = (section: ISection) =>
    action(EActionSections.ADD_SUCCESS, section);

const addFailureSection = () => action(EActionSections.ADD_FAILURE);

const modifyRequestSection = (
    section: ISection
): IAction<EActionSections, ISection> =>
    action(EActionSections.MODIFY_REQUEST, section);

const modifySuccessSection = (section: ISection) =>
    action(EActionSections.MODIFY_SUCCESS, section);

const modifyFailureSection = () => action(EActionSections.MODIFY_FAILURE);

const removeRequestSection = (section: ISection) =>
    action(EActionSections.REMOVE_REQUEST, section);

const removeSuccessSection = (section: ISection) =>
    action(EActionSections.REMOVE_SUCCESS, section);

const removeFailureSection = () => action(EActionSections.REMOVE_FAILURE);

export {
    loadSections,
    loadSuccessSections,
    loadFailureSections,
    addRequestSection,
    addSuccessSection,
    addFailureSection,
    modifyRequestSection,
    modifySuccessSection,
    modifyFailureSection,
    removeRequestSection,
    removeSuccessSection,
    removeFailureSection,
};

// Reducer
const defaultSections: IRequestStore<ISection[]> = {
    data: [] as ISection[],
    loading: false,
    error: false,
};

const sectionManagementReducer: Reducer<
    IRequestStore<ISection[]>,
    IAction<EActionSections, ISection[] | ISection>
> = (state = defaultSections, action) => {
    switch (action.type) {
        case EActionSections.REMOVE_REQUEST:
        case EActionSections.MODIFY_REQUEST:
        case EActionSections.ADD_REQUEST:
        case EActionSections.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case EActionSections.LOAD_SUCCESS:
            return {
                data: action.payload as ISection[],
                loading: false,
                error: false,
            };

        case EActionSections.REMOVE_FAILURE:
        case EActionSections.MODIFY_FAILURE:
        case EActionSections.ADD_FAILURE:
        case EActionSections.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case EActionSections.MODIFY_SUCCESS:
            const section_m = action.payload as ISection;
            return {
                data: state.data.reduce<ISection[]>(
                    (sections, section) => [
                        ...sections,
                        section.id === section_m.id ? section_m : section,
                    ],
                    []
                ),
                loading: false,
                error: false,
            };

        case EActionSections.ADD_SUCCESS:
            return {
                data: [...state.data, action.payload as ISection],
                loading: false,
                error: false,
            };

        case EActionSections.REMOVE_SUCCESS:
            const section_rm = action.payload as ISection;
            return {
                data: state.data.filter(
                    (section) => section.id !== section_rm.id
                ),
                loading: false,
                error: false,
            };
        default:
            return state;
    }
};

export default sectionManagementReducer;
