// Action Types

import { action } from 'typesafe-actions';
import { Reducer } from 'react';
import { IStepModel, ISubStep } from '../../../model/stepper-model';
import { IAction } from '../../../model/stores';
import store, { ApplicationState } from '../..';

export enum EActionStepper {
    NEXT_STEP = '@stepper/NEXT_STEP',
    INIT_STEP = '@stepper/INIT_STEP',
    BACK_STEP = '@stepper/BACK_STEP',

    INIT_SUBSTEP = '@stepper/INIT_SUBSTEP',
    NEXT_SUBSTEP = '@stepper/NEXT_SUBSTEP',
}

// Base types
type InitStep = Omit<IStepModel, 'step' | 'next' | 'back' | 'subStep'>;
type ChangeStep = Omit<
    IStepModel,
    'step' | 'limit' | 'init' | 'next' | 'back' | 'subStep'
>;
type InitSubStep = Omit<ISubStep, 'step' | 'next'>;

// Actions Creators
export const initStep = (stepConf: InitStep) => {
    return action(EActionStepper.INIT_STEP, stepConf);
};

export const nextStep = (next: number, surv_limit: number, limit?: number) => {
    const data = (store.getState() as ApplicationState).execution_experiment
        .data;

    if (next === limit) {
        return action(EActionStepper.NEXT_STEP);
    }

    if (next > surv_limit - 1) {
        const quizes = data.quizzes[next - surv_limit];

        next - surv_limit < data.quizzes.length &&
            store.dispatch(
                initSubStep({
                    init: 0,
                    limit: quizes.questions.length,
                    timeInit: 0,
                })
            );

        return action(EActionStepper.NEXT_STEP, {
            data: quizes.section,
        });
    } else {
        return action(EActionStepper.NEXT_STEP, {
            data: data.surveys[next].section,
        });
    }
};
export const backStep = (back: number) => {
    const data = (store.getState() as ApplicationState).execution_experiment
        .data.surveys;

    return action(EActionStepper.BACK_STEP, { data: data[back].section });
};

export const initSubStep = (subStepConf: InitSubStep) =>
    action(EActionStepper.INIT_SUBSTEP, subStepConf);
export const nextSubStep = (timeEnd: number) =>
    action(EActionStepper.NEXT_SUBSTEP, timeEnd);

// Reducer

const defaultStep: IStepModel = {
    step: 0,
    limit: 1,
    init: 0,
    surv_limit: 0,
    next: 0,
    back: 0,
    subStep: {} as ISubStep,
};

// Methods
const getNextValue = (
    nextStep: number,
    limit: number,
    init: number
): number => {
    if (nextStep <= limit - 1 && nextStep >= init) {
        return nextStep + 1;
    } else if (nextStep === limit - 1) {
        return nextStep;
    } else {
        return nextStep + 1;
    }
};

const getBackValue = (
    backStep: number,
    init: number,
    limit: number
): number => {
    if (backStep > init && backStep < limit) {
        return backStep - 1;
    } else if (backStep === init) {
        return backStep;
    } else {
        return backStep - 1;
    }
};

const stepReducer: Reducer<
    IStepModel,
    IAction<EActionStepper, InitStep | ChangeStep | InitSubStep | number>
> = (state = defaultStep, action) => {
    const newStep = action.payload;

    switch (action.type) {
        case EActionStepper.INIT_STEP:
            const step = newStep as InitStep;

            return {
                ...state,
                ...step,
                step: step.init,
                next: getNextValue(step.init, step.limit, step.init),
                back: step.init,
            };

        case EActionStepper.NEXT_STEP:
            return state.step + 1 <= state.limit
                ? {
                      ...state,
                      ...(newStep as ChangeStep),
                      step: state.next,
                      next: getNextValue(
                          state.step + 1,
                          state.limit,
                          state.init
                      ),
                      back: getBackValue(
                          state.step + 1,
                          state.init,
                          state.limit
                      ),
                  }
                : state;
        case EActionStepper.BACK_STEP:
            return state.step - 1 >= state.init
                ? {
                      ...state,
                      ...(newStep as ChangeStep),
                      step: state.back,
                      next: getNextValue(
                          state.step - 1,
                          state.limit,
                          state.init
                      ),
                      back: getBackValue(
                          state.step - 1,
                          state.init,
                          state.limit
                      ),
                  }
                : state;

        case EActionStepper.INIT_SUBSTEP:
            const initSubStep = action.payload as InitSubStep;
            return {
                ...state,
                subStep: {
                    ...initSubStep,
                    step: initSubStep.init,
                    next: initSubStep.init + 1,
                },
            };

        case EActionStepper.NEXT_SUBSTEP:
            const timeEnd = action.payload as number;
            return {
                ...state,
                subStep: {
                    ...state.subStep,
                    timeInit: timeEnd,
                    step: state.subStep.next,
                    next: getNextValue(
                        state.subStep.step + 1,
                        state.subStep.limit,
                        state.subStep.init
                    ),
                },
            };
        default:
            return state;
    }
};

export default stepReducer;
