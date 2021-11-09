// Components
import { IFormElements } from '../../../model/experiment/IExecutionExperiment';

// Librarys
import React from 'react';
import {
    createStyles,
    makeStyles,
    Step,
    StepLabel,
    Stepper,
    Theme,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import ResultsView from '../results';
import TypeForm from './type-form';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '90%',
            margin: 'auto',
        },
    })
);

export interface IStepperProps {
    username: string;
    elements: IFormElements[];
}
export default function StepperExperiment({
    elements,
    username,
}: IStepperProps) {
    const classes = useStyles();

    const step_names = elements.map((el) => el.section.title);
    // Redux Manage
    const stepElements = useSelector(
        (state: ApplicationState) => state.section_steps
    );

    return (
        <div className={classes.root}>
            {/* Step titles */}
            <Stepper activeStep={stepElements.step} alternativeLabel>
                {step_names.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Step Content */}
            {stepElements.step === stepElements.limit ? (
                <ResultsView username={username} />
            ) : (
                <TypeForm />
            )}
        </div>
    );
}
