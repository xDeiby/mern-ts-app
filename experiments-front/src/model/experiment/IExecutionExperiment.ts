import { IImageModel } from '.';
import { IExperiment } from './IExperiment';
import { IQuestion } from './IQuestion';
import { ISection } from './ISection';

// Experiment
export interface IExecutionExperiment {
    id: string;
    userName: string;
    userEmail?: string;
    creationDate: Date;
    experiment: IExperiment;
    surveys: IFormElements[];
    quizzes: IFormElements[];
}

export interface IFormElements {
    section: ISection;
    questions: IQuestion[];
    imageDetails?: IImageModel;
}
