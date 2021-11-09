// Librarys
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    })
);

export interface IDatePickers {
    label: string;
    value: string;
    name: string;
    changeValue: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
}

// Components
export default function DatePicker({
    label,
    value,
    name,
    changeValue,
}: IDatePickers) {
    // Styles
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label={label}
                name={name}
                type="date"
                value={value}
                className={classes.textField}
                onChange={changeValue}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}
