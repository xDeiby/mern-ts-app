import { ISection } from '../experiment';

export interface IStepModel {
    step: number;
    init: number;
    surv_limit: number;
    limit: number;
    next: number;
    back: number;
    subStep: ISubStep;
}

export interface ISubStep {
    init: number;
    timeInit: number;
    step: number;
    next: number;
    limit: number;
}
