// Components
import RemoveElement from '../../../float-buttons/RemoveElement';
import SaveChanges from '../../../float-buttons/SaveChanges';
import { IAlternative, IQuestion } from '../../../../model/experiment';
import { ETypeQuestion } from '../../../../model/experiment/enum-types';
import {
    EActionQuestions,
    modifyRequestQuestion,
    removeRequestQuestion,
} from '../../../../store/ducks/experiment-management/questions';
import { objectEquals } from '../../../../utils/modules/compare';

// Librarys
import * as React from 'react';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CloseIcon from '@material-ui/icons/Close';
import {
    Button,
    Checkbox,
    CheckboxProps,
    Divider,
    FormControlLabel,
    IconButton,
    Link,
    MenuItem,
    Radio,
    Select,
    Switch,
    TextField,
    withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

// Model props
export interface IQuestionManageProps {
    question: IQuestion;
}

// Styles
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

// Component
export default function QuestionManage(props: IQuestionManageProps) {
    // States
    const [questionElements, setQuestionElements] = React.useState<IQuestion>(
        props.question
    );
    const [assing, setAssing] = React.useState<boolean>(false);

    // Methods
    const changeType = (e: any) => {
        setQuestionElements({
            ...questionElements,
            type: e.target.value,
            alternatives: [{ value: 'Opción 1' }],
        });
    };

    const assignCorrect = (alternative_m: IAlternative) => {
        setQuestionElements({
            ...questionElements,
            alternatives: questionElements.alternatives.map((alternative) => {
                if (alternative === alternative_m) {
                    alternative.isCorrect = true;
                } else {
                    delete alternative.isCorrect;
                }
                return alternative;
            }),
        });
    };

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
            {/* Question */}
            <TextField
                style={{ marginBottom: '15px' }}
                autoFocus
                margin="dense"
                id="title-question"
                label="Pregunta"
                type="text"
                value={questionElements.question}
                onChange={({ currentTarget }) =>
                    setQuestionElements({
                        ...questionElements,
                        question: currentTarget.value,
                    })
                }
                fullWidth
            />
            {/* Question type */}
            {!questionElements.points && (
                <Select
                    style={{ marginBottom: '15px' }}
                    labelId="demo-simple-select-label"
                    id="type-question-select"
                    value={questionElements.type}
                    fullWidth
                    onChange={changeType}
                >
                    <MenuItem value={ETypeQuestion.MULTIPLY}>
                        Selección Multiple
                    </MenuItem>
                    <MenuItem value={ETypeQuestion.SELECT}>
                        Selección Excluyente
                    </MenuItem>
                    <MenuItem value={ETypeQuestion.LIST}>Desplegable</MenuItem>
                </Select>
            )}

            {/* Alternatives */}
            {questionElements.alternatives.map((alternative, index) => (
                <div key={index}>
                    {assing && (
                        <FormControlLabel
                            control={
                                <GreenCheckbox
                                    checked={
                                        alternative.isCorrect ? true : false
                                    }
                                    onChange={() => assignCorrect(alternative)}
                                    name="checkedG"
                                />
                            }
                            label=""
                        />
                    )}

                    {questionElements.type === ETypeQuestion.SELECT && (
                        <Radio color="primary" />
                    )}
                    {questionElements.type === ETypeQuestion.MULTIPLY && (
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    )}

                    {questionElements.type === ETypeQuestion.LIST &&
                        `${index + 1}. `}

                    <TextField
                        autoFocus
                        margin="dense"
                        id="alternative-question"
                        type="text"
                        value={alternative.value}
                        onChange={({ currentTarget }) => {
                            const new_alternatives = [
                                ...questionElements.alternatives,
                            ];
                            new_alternatives[index] = {
                                ...new_alternatives[index],
                                value: currentTarget.value as string,
                            };

                            setQuestionElements({
                                ...questionElements,
                                alternatives: new_alternatives,
                            });
                        }}
                    />

                    <IconButton
                        aria-label="delete"
                        disabled={questionElements.alternatives.length < 2}
                        onClick={() =>
                            setQuestionElements({
                                ...questionElements,
                                alternatives:
                                    questionElements.alternatives.filter(
                                        (alternative, currentIndex) =>
                                            currentIndex !== index
                                    ),
                            })
                        }
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            ))}

            {/* Remove alternative */}
            <div>
                <Radio color="primary" disabled />
                <Link
                    component="button"
                    variant="subtitle1"
                    id="add-option"
                    onClick={() => {
                        setQuestionElements({
                            ...questionElements,
                            alternatives: [
                                ...questionElements.alternatives,
                                {
                                    value: `Opción ${
                                        questionElements.alternatives.length + 1
                                    }`,
                                },
                            ],
                        });
                    }}
                >
                    Agregar Opción
                </Link>
            </div>

            {questionElements.points && (
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="explanation-question"
                        label="Justificación (Opcional)"
                        type="text"
                        multiline
                        rows={2}
                        variant="filled"
                        value={
                            questionElements.explanation
                                ? questionElements.explanation
                                : ''
                        }
                        onChange={({ currentTarget }) =>
                            setQuestionElements({
                                ...questionElements,
                                explanation: currentTarget.value,
                            })
                        }
                        fullWidth
                    />
                </div>
            )}

            <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                <Divider />
            </div>
            {/* Required */}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                {!questionElements.points && (
                    <FormControlLabel
                        control={
                            <Switch
                                disabled={!!questionElements.points}
                                checked={questionElements.required}
                                onChange={(e) =>
                                    setQuestionElements({
                                        ...questionElements,
                                        required: e.target.checked,
                                    })
                                }
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Obligatoria"
                    />
                )}

                {questionElements.points && (
                    <Button
                        color="primary"
                        startIcon={
                            assing ? <CloseIcon /> : <CheckCircleRoundedIcon />
                        }
                        onClick={() => setAssing(!assing)}
                        disabled={!questionElements.points}
                    >
                        Asignar Correctas
                    </Button>
                )}

                <RemoveElement
                    data_rm={questionElements}
                    removeFunction={removeRequestQuestion}
                    experimentId={questionElements.experiment}
                />
            </div>

            {/* Question quiz options */}
            {questionElements.points && (
                <TextField
                    label="Puntos"
                    id="outlined-size-small"
                    type="number"
                    value={questionElements.points}
                    onChange={(e) =>
                        parseInt(e.currentTarget.value) > 0 &&
                        setQuestionElements({
                            ...questionElements,
                            points: parseInt(e.currentTarget.value),
                        })
                    }
                    variant="outlined"
                    size="small"
                />
            )}
            {!objectEquals(questionElements, props.question) && (
                <SaveChanges<IQuestion, EActionQuestions>
                    change={modifyRequestQuestion}
                    data={questionElements}
                    experimentId={questionElements.experiment}
                />
            )}
        </div>
    );
}
