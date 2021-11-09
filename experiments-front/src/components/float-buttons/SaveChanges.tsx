// Components
import { IAction } from '../../model/stores';
import { ApplicationState } from '../../store';
import {
    loadRequestCreateLogs,
    modifyLogRequest,
} from '../../store/ducks/experiment-management/log-changes';

// Librarys
import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// Model
export interface ISaveChangesProps<T, K> {
    change: (data: T) => IAction<K, T>;
    experimentId: string;
    data: T;
}

// Component
export default function SaveChanges<T, K>(props: ISaveChangesProps<T, K>) {
    // State Management
    const dispatch = useDispatch();
    const log_modify = useSelector(
        (store: ApplicationState) => store.log_changes
    );

    // Methods
    const modify = () => {
        dispatch(props.change(props.data));

        if (Object.keys(log_modify.data).length) {
            dispatch(
                modifyLogRequest({ ...log_modify.data, endDate: new Date() })
            );
        } else {
            dispatch(loadRequestCreateLogs(props.experimentId));
        }
    };

    return (
        <Button variant="contained" color="primary" onClick={() => modify()}>
            Guardar
        </Button>
    );
}
