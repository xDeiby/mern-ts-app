// Components
import { IQuestion } from '../../../../model/experiment';
import { ETypeQuestion } from '../../../../model/experiment/enum-types';

// Librarys
import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {
    Checkbox,
    Chip,
    createStyles,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Theme,
    Typography,
} from '@material-ui/core';

// Model props
export interface IQuestionViewProps {
    question: IQuestion;
}

// Styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            width: '100%',
        },
    })
);

// Component
export default function QuestionView(props: IQuestionViewProps) {
    const { question } = props;
    const classes = useStyles();

    return (
        <div
            style={{
                padding: '30px',
                marginBottom: '20px',
                backgroundColor: 'white',
                borderRadius: '15px',
                WebkitBoxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                boxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
            }}
        >
            {/* Points */}
            {question.points && (
                <Chip
                    style={{ float: 'right' }}
                    icon={<StarBorderIcon />}
                    label={`${question.points} puntos`}
                    // clickable
                    color="secondary"
                    // onDelete={handleDelete}
                    // deleteIcon={<DoneIcon />}
                    variant="outlined"
                />
            )}{' '}
            {/* Required */}
            <Typography variant={'subtitle1'} gutterBottom>
                {question.question}{' '}
                {question.required && (
                    <strong style={{ color: 'red' }}>*</strong>
                )}
            </Typography>
            {/* Type Options */}
            {question.type === ETypeQuestion.SELECT && (
                <RadioGroup>
                    {question.alternatives.map((alternative, index) => (
                        <FormControlLabel
                            key={index}
                            value={alternative.value}
                            control={<Radio color="primary" />}
                            label={alternative.value}
                        />
                    ))}
                </RadioGroup>
            )}
            {question.type === ETypeQuestion.MULTIPLY && (
                <FormGroup aria-label="position">
                    {question.alternatives.map((alternative, index) => (
                        <FormControlLabel
                            key={index}
                            value={alternative.value}
                            control={<Checkbox color="primary" />}
                            label={alternative.value}
                        />
                    ))}
                </FormGroup>
            )}
            {question.type === ETypeQuestion.LIST && (
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                        Selecciona una alternativa
                    </InputLabel>
                    <Select
                        style={{ marginBottom: '15px' }}
                        labelId="demo-simple-select-label"
                        id="alternative-question-select"
                        label="Selecciona"
                        fullWidth
                    >
                        {question.alternatives.map((alternative, index) => (
                            <MenuItem key={index} value={index}>
                                {alternative.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </div>
    );
}
