import { combineReducers } from 'redux';
import experimentExecutionReducer from './executionExperiment';
import experimentReducer from './experiment';
import experimentManagementReducer from './experiment-management/experiment';
import imageManagementReducer from './experiment-management/images-model';
import logChangesReducer from './experiment-management/log-changes';
import questionManagementReducer from './experiment-management/questions';
import sectionManagementReducer from './experiment-management/sections';
import modelTypesReducer from './modelType';
import stepReducer from './stepper';

export default combineReducers({
    modelTypes: modelTypesReducer,
    experiments: experimentReducer,
    experiment_manage: experimentManagementReducer,
    sections_manage: sectionManagementReducer,
    images_manage: imageManagementReducer,
    questions_manage: questionManagementReducer,
    log_changes: logChangesReducer,
    execution_experiment: experimentExecutionReducer,
    section_steps: stepReducer,
});
