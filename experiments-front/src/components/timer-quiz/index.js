// Components
import {
    quizModify,
    selectAlternative,
} from '../../store/ducks/executionExperiment';

// Librarys
import React from 'react';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ImageIcon from '@material-ui/icons/Image';

import { Button, Divider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { SectionSelect } from '../execution-experiment/stepper/select-section';
import { nextSubStep } from '../../store/ducks/stepper';
import { questionComplete } from '../../utils/modules/sectionComplete';

// Component
export default function TimerQuiz({ onEndQuiz }) {
    // quiz
    const { section, questions, imageDetails } =
        SectionSelect().sectionElements;

    const { subStep } = useSelector((state) => state.section_steps);

    // States of timer
    const [secondsTime, setSecondsTime] = React.useState(section.quizTime % 60);
    const [minutesTime, setMinutesTime] = React.useState(
        Math.floor(section.quizTime / 60)
    );

    const dispatch = useDispatch();

    // Logic of timer
    let intervalRef = React.useRef();

    const decreaseTime = () => {
        if (secondsTime > 0) {
            setSecondsTime(secondsTime - 1);
        }
        if (secondsTime === 0) {
            if (minutesTime === 0) {
                endQuiz();
            } else {
                setMinutesTime(minutesTime - 1);
                setSecondsTime(59);
            }
        }
    };

    React.useEffect(() => {
        intervalRef.current = setInterval(decreaseTime, 1000);
        return () => clearInterval(intervalRef.current);
    });

    React.useEffect(() => {
        setSecondsTime(section.quizTime % 60);
        setMinutesTime(Math.floor(section.quizTime / 60));
    }, [section]);

    // Methods
    const isCompleteQuiz = () => {
        const responses = questions.reduce(
            (responses, question) =>
                question.alternatives.find(
                    (alternative) => alternative.selected
                )
                    ? responses + 1
                    : responses,
            0
        );

        return responses === questions.length;
    };

    const nextQuestion = () => {
        const timeEnd =
            section.quizTime -
            (minutesTime * 60 + secondsTime) -
            subStep.timeInit;

        dispatch(
            selectAlternative({ ...questions[subStep.step], timeResp: timeEnd })
        );
        dispatch(nextSubStep(timeEnd));
    };

    // Function to end quiz
    const endQuiz = () => {
        clearInterval(intervalRef.current);
        const time_end = section.quizTime - (minutesTime * 60 + secondsTime);

        const timeEnd =
            section.quizTime -
            (minutesTime * 60 + secondsTime) -
            subStep.timeInit;

        dispatch(
            selectAlternative({ ...questions[subStep.step], timeResp: timeEnd })
        );
        dispatch(quizModify({ ...section, timeEnd: time_end }));
        onEndQuiz();
    };

    return (
        <div
            style={{
                position: 'fixed',
                right: 10,
                bottom: '30%',
                width: '15%',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                marginTop: '10px',
                boxSizing: 'border-box',
                WebkitBoxShadow: 'rgb(0, 0, 0) 2px 2px 8px -1px',
                boxShadow: 'rgb(0, 0, 0) 2px 2px 8px -1px',
                color: '#3F51B5',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                {/* Header */}
                <strong style={{ marginBottom: '5px' }}>
                    Tiempo de Evaluación
                </strong>
                <Divider />
                <div
                    style={{
                        marginTop: '5px',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Time to end */}
                        <div
                            style={{
                                padding: '10px',
                                boxSizing: 'border-box',
                                border: 'black solid 1px',
                                borderRadius: '10px',
                                width: '50px',
                                margin: 'auto',
                            }}
                        >
                            {minutesTime > 9 ? minutesTime : `0${minutesTime}`}
                        </div>
                        minutos
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                padding: '10px',
                                boxSizing: 'border-box',
                                border: 'black solid 1px',
                                borderRadius: '10px',
                                width: '50px',
                                margin: 'auto',
                            }}
                        >
                            {secondsTime > 9 ? secondsTime : `0${secondsTime}`}
                        </div>
                        segundos
                    </div>
                </div>
            </div>

            {/* Short Description of Quiz */}
            <div style={{ marginTop: '10px' }}>
                <Divider />
                <Typography style={{ marginBottom: '8px' }} align="center">
                    <strong>Datos</strong>
                </Typography>
                <Typography variant="subtitle2">
                    Puntos totales:{' '}
                    {questions.reduce(
                        (points, question) =>
                            question.points ? points + question.points : points,
                        0
                    )}
                </Typography>

                <Typography variant="subtitle2" color="inherit">
                    Preguntas respondidas:{' '}
                    {questions.reduce(
                        (responses, question) =>
                            question.alternatives.find(
                                (alternative) => alternative.selected
                            )
                                ? responses + 1
                                : responses,
                        0
                    )}
                    / {questions.length}
                </Typography>
            </div>

            <div
                style={{
                    marginTop: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {subStep.next !== subStep.limit ? (
                    <Button
                        id="next-question"
                        variant="outlined"
                        color="primary"
                        startIcon={<EventAvailableIcon />}
                        disabled={!questionComplete(questions[subStep.step])}
                        onClick={nextQuestion}
                    >
                        Siguiente
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        color="primary"
                        id="end-quiz"
                        startIcon={<EventAvailableIcon />}
                        disabled={!isCompleteQuiz()}
                        onClick={endQuiz}
                    >
                        Terminar
                    </Button>
                )}
                <Button
                    style={{ marginTop: '5px' }}
                    startIcon={<ImageIcon />}
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                        window.open(imageDetails.pathImage, '_blank')
                    }
                >
                    Ver Modelo
                </Button>
            </div>
        </div>
    );
}
