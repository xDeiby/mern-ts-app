import { ETypeSection } from './enum-types';

export interface ISection {
    id: string;
    experiment: string;
    type: ETypeSection;
    quizTime?: number;
    timeEnd?: number;
    title: string;
    description: string;
}
