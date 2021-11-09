// Components
import { IQuestion } from '../../../../model/experiment';

// Librarys
import * as React from 'react';
import QuestionManage from './QuestionManage';
import QuestionView from './QuestionView';

// Model props
export interface IQuestionProps {
    question: IQuestion;
}

// Component
export function Question(props: IQuestionProps) {
    const { question } = props;

    // States
    const [isEdit, setIsEdit] = React.useState<boolean>(false);

    // Component
    return isEdit ? (
        <QuestionManage question={question} />
    ) : (
        <div onClick={() => setIsEdit(true)}>
            <QuestionView question={question} />
        </div>
    );
}
