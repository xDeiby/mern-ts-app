// Components
import SectionView from '../../experiment-manage/survey-and-quiz/section/SectionView';
import QuestionForm from '../question';
import TimerQuiz from '../../timer-quiz';

// Librarys
import * as React from 'react';
import { Button, Typography } from '@material-ui/core';
import { SectionSelect } from '../../execution-experiment/stepper/select-section';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { QuestionResult } from '../../results-quiz/QuestionResult';
import ModalQuiz from '../../modals/modal-info/ModalQuiz';
import { initSubStep, nextStep } from '../../../store/ducks/stepper';
import { createExecutionExperimentRequest } from '../../../store/ducks/executionExperiment';

// Component
export default function QuizFormView() {
    // Quiz elements and endEvaluation function to end quiz

    const { questions, section } = SectionSelect().sectionElements;
    const [isEndQuiz, setIsEndQuiz] = React.useState(false);

    const { subStep, next, surv_limit, limit } = useSelector(
        (state: ApplicationState) => state.section_steps
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
        !subStep.step !== undefined &&
            dispatch(
                initSubStep({
                    init: 0,
                    limit: questions.length,
                    timeInit: 0,
                })
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    const handleNext = () => {
        dispatch(nextStep(next, surv_limit, limit));
        next === limit && dispatch(createExecutionExperimentRequest());
        setIsEndQuiz(false);
    };

    return isEndQuiz ? (
        <div className="resuslt-prev">
            <Typography
                variant={'h4'}
                align="center"
                color="primary"
                style={{ margin: '10px 0px', fontWeight: 'bold' }}
            >
                Resultados previos: {section.title}
            </Typography>
            {questions.map((question) => (
                <QuestionResult key={question.id} question={question} />
            ))}

            {next === limit ? (
                <Button onClick={handleNext}>Terminar Cuestionarios</Button>
            ) : (
                <ModalQuiz
                    disabled={false}
                    nextStep={handleNext}
                    quizIndex={next - surv_limit}
                />
            )}
        </div>
    ) : (
        <>
            {subStep.step !== undefined && (
                <>
                    {/* Section title, description, time, etc */}
                    <SectionView section={section} />

                    {/* Question Title */}
                    <Typography
                        variant={'h6'}
                        align="center"
                        style={{ margin: '30px 0px', fontWeight: 'bold' }}
                    >
                        {`Pregunta N.º ${subStep.step + 1}: ${
                            questions[subStep.step].question
                        }`}
                    </Typography>

                    <QuestionForm
                        isInQuiz={true}
                        key={questions[subStep.step].id}
                        question={questions[subStep.step]}
                    />
                </>
            )}
            <TimerQuiz onEndQuiz={() => setIsEndQuiz(true)} />
        </>
    );
}
