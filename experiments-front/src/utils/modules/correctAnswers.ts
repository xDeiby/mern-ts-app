import { IQuestion } from '../../model/experiment';

export const correctAnswers = (questions: IQuestion[]) =>
    questions.reduce(
        (responses, question) =>
            question.alternatives.find(
                (alternative) => alternative.selected && alternative.isCorrect
            )
                ? responses + 1
                : responses,
        0
    );
