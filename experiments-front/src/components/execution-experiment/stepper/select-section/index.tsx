import { useSelector } from 'react-redux';
import { IFormElements } from '../../../../model/experiment/IExecutionExperiment';
import { ApplicationState } from '../../../../store';

export function SectionSelect() {
    const sectionElements = useSelector((state: ApplicationState) => {
        const step = state.section_steps.step;
        const sections = [
            ...state.execution_experiment.data.surveys,
            ...state.execution_experiment.data.quizzes,
        ];

        return sections[step];
    }) as IFormElements;

    const allSections = useSelector((state: ApplicationState) => {
        const experiment = state.execution_experiment.data;
        return [...experiment.surveys, ...experiment.quizzes];
    });
    return { sectionElements, allSections };
}
