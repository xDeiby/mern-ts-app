// Components
import { IAlternative, IQuestion } from '../../../model/experiment';
import { ETypeQuestion } from '../../../model/experiment/enum-types';
import { selectAlternative } from '../../../store/ducks/executionExperiment';

// Librarys
import * as React from 'react';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import {
    Checkbox,
    Chip,
    createStyles,
    FormControl,
    FormControlLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Theme,
    Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

// Model Props IQuestion
export interface IQuestionFormProps {
    question: IQuestion;
    isInQuiz?: boolean;
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

export default function QuestionForm(props: IQuestionFormProps) {
    // const [optionSelected, optionSelected] = React.useState

    const { question, isInQuiz } = props;
    const dispatch = useDispatch();

    const classes = useStyles();

    const changeChecked = (alternative: IAlternative, checked?: boolean) => {
        const modify_question = {
            ...props.question,
            alternatives: props.question.alternatives.map((alt) => {
                if (alt === alternative) {
                    alt.selected =
                        question.type === ETypeQuestion.SELECT ? true : checked;
                } else {
                    question.type === ETypeQuestion.SELECT &&
                        delete alt.selected;
                }
                return alt;
            }),
        };
        dispatch(selectAlternative({ ...modify_question }));
    };

    const getValue = () => {
        const isSelected = question.alternatives.find(
            (alternative) => alternative.selected
        );

        return isSelected
            ? question.alternatives.findIndex(
                  (alternative) => alternative.selected
              )
            : -1;
    };

    const changeSelect = (index: number) => {
        const modify_question = {
            ...props.question,
            alternatives: props.question.alternatives.map(
                (alternative, currentIndex) => {
                    if (currentIndex === index) {
                        alternative.selected = true;
                    } else {
                        delete alternative.selected;
                    }
                    return alternative;
                }
            ),
        };

        dispatch(selectAlternative({ ...modify_question }));
    };

    return (
        <div>
            <div
                id="options-container"
                style={{
                    padding: '30px',
                    marginBottom: '20px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    WebkitBoxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                    boxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                }}
            >
                {question.points && (
                    <Chip
                        style={{ float: 'right' }}
                        icon={<StarOutlineIcon />}
                        label={`${question.points} puntos`}
                        // clickable
                        color="secondary"
                        // onDelete={handleDelete}
                        // deleteIcon={<DoneIcon />}
                        variant="outlined"
                    />
                )}{' '}
                <Typography variant={'subtitle1'} gutterBottom>
                    {isInQuiz
                        ? 'Seleccione una Alternativa'
                        : question.question}{' '}
                    {question.required && (
                        <strong style={{ color: 'red' }}>*</strong>
                    )}
                </Typography>
                {question.type === ETypeQuestion.SELECT && (
                    <RadioGroup>
                        {question.alternatives.map((alternative, index) => (
                            <FormControlLabel
                                id="radio-option"
                                key={index}
                                value={alternative.value}
                                control={
                                    <Radio
                                        color="primary"
                                        checked={
                                            alternative.selected ? true : false
                                        }
                                        onChange={() =>
                                            changeChecked(alternative)
                                        }
                                    />
                                }
                                label={alternative.value}
                            />
                        ))}
                    </RadioGroup>
                )}
                {question.type === ETypeQuestion.MULTIPLY && (
                    <FormControl component="fieldset">
                        {' '}
                        {question.alternatives.map((alternative, index) => (
                            <FormControlLabel
                                id="checkbox-option"
                                key={index}
                                value={alternative.value}
                                control={
                                    <Checkbox
                                        checked={
                                            alternative.selected ? true : false
                                        }
                                        color="primary"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            changeChecked(
                                                alternative,
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label={alternative.value}
                            />
                        ))}
                    </FormControl>
                )}
                {question.type === ETypeQuestion.LIST && (
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Selecciona una alternativa
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="type-question-select"
                            value={getValue()}
                            onChange={(e) =>
                                changeSelect(e.target.value as number)
                            }
                            label="aaaa"
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
        </div>
    );
}
