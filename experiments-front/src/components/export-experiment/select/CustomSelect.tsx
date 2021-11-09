import {
    FormControl,
    Select,
    MenuItem,
    makeStyles,
    InputLabel,
} from '@material-ui/core';
import * as React from 'react';
import { IModelType } from '../../../model/experiment';

export interface ICustomSelectProps {
    changeModel: (id: string) => void;
    model: string;
    options: IModelType[];
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export function CustomSelect({
    changeModel,
    model,
    options,
}: ICustomSelectProps) {
    const styles = useStyles();

    return (
        <FormControl variant="outlined" className={styles.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
                Modelo
            </InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={model}
                onChange={(e) => changeModel(e.target.value as string)}
                label="Modelo"
            >
                <MenuItem value="" disabled>
                    <em>Todos</em>
                </MenuItem>
                {options.map((md) => (
                    <MenuItem key={md.id} value={md.id}>
                        {md.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
