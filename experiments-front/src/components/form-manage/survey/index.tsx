import * as React from 'react';
import { IFormElements } from '../../../model/experiment/IExecutionExperiment';
import SectionView from '../../experiment-manage/survey-and-quiz/section/SectionView';
import QuestionForm from '../question';

export interface ISurveyFormViewProps {
    survey: IFormElements;
}

export default function SurveyFormView(props: ISurveyFormViewProps) {
    const { survey } = props;
    return (
        <>
            <SectionView section={survey.section} />
            {survey.questions.map((question) => (
                <QuestionForm key={question.id} question={question} />
            ))}
        </>
    );
}
