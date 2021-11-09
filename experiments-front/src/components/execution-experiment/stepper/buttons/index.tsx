import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import { backStep, nextStep } from '../../../../store/ducks/stepper';
import ModalQuiz from '../../../modals/modal-info/ModalQuiz';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { SectionSelect } from '../select-section';
import { sectionComplete } from '../../../../utils/modules/sectionComplete';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backButton: {
            marginRight: theme.spacing(1),
        },
    })
);
export default function StepperButtons() {
    // Style
    const classes = useStyles();

    // Redux Manage
    const { step, limit, back, next, surv_limit } = useSelector(
        (state: ApplicationState) => state.section_steps
    );

    const { sectionElements } = SectionSelect();
    const dispatch = useDispatch();

    // Methods
    const handleBack = () => {
        dispatch(backStep(back));
    };

    const handleNext = () => {
        dispatch(nextStep(next, surv_limit));
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            {step < surv_limit && (
                <Button
                    disabled={step === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                    startIcon={<ArrowBackIcon />}
                >
                    Atras
                </Button>
            )}

            {step === surv_limit - 1 && (
                <ModalQuiz
                    disabled={!sectionComplete(sectionElements.questions)}
                    nextStep={handleNext}
                    quizIndex={next - surv_limit}
                />
            )}

            {step < surv_limit - 1 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    endIcon={<ArrowForwardIcon />}
                    disabled={!sectionComplete(sectionElements.questions)}
                >
                    {step === limit - 1 ? 'Terminar' : 'Siguiente'}
                </Button>
            )}
        </div>
    );
}
