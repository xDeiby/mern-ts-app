import { ETypeQuestion } from './enum-types';
import { IAlternative } from './IAlternative';

export interface IQuestion {
    id: string;
    section: string;
    experiment: string;
    alternatives: IAlternative[];
    question: string;
    type: ETypeQuestion;
    timeResp?: Date;
    required?: boolean;
    points?: number;
    explanation?: string;
}
