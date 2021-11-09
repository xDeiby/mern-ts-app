// Components
import { IQuestion, ISection } from '../../model/experiment';
import { IAction } from '../../model/stores';
import { ApplicationState } from '../../store';
import {
    loadRequestCreateLogs,
    modifyLogRequest,
} from '../../store/ducks/experiment-management/log-changes';

// Librarys
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// Model props
export interface IRemoveElementProps<T, K> {
    removeFunction: (data_rm: T) => IAction<K, T>;
    experimentId: string;
    data_rm: T;
    setTabActive?: (tab: number) => void;
}

// Function to validation
const instanceOfQuestion = (data: any): data is IQuestion => 'question' in data;
const instanceOfSection = (data: any): data is ISection =>
    'description' in data;

// Component
export default function RemoveElement<T, K>(props: IRemoveElementProps<T, K>) {
    // Store Management
    const dispatch = useDispatch();
    const log_modify = useSelector(
        (store: ApplicationState) => store.log_changes
    );

    const { data_rm, removeFunction, experimentId, setTabActive } = props;

    const cant = useSelector((store: ApplicationState) => {
        if (instanceOfQuestion(data_rm)) {
            return store.questions_manage.data.filter(
                (question) => question.section === data_rm.section
            ).length;
        } else if (instanceOfSection(data_rm)) {
            return store.sections_manage.data.filter(
                (section) => section.type === data_rm.type
            ).length;
        }
    });

    // Methods
    const remove_element = () => {
        setTabActive && setTabActive(0);

        dispatch(removeFunction(data_rm));

        if (Object.keys(log_modify.data).length) {
            dispatch(
                modifyLogRequest({ ...log_modify.data, endDate: new Date() })
            );
        } else {
            dispatch(loadRequestCreateLogs(experimentId));
        }
    };

    return (
        <IconButton
            aria-label="delete"
            size="medium"
            onClick={remove_element}
            disabled={cant === 1}
        >
            <DeleteIcon />
        </IconButton>
    );
}
