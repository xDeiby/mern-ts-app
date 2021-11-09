import { IQuestion } from '../../model/experiment';

export const sectionComplete = (questions: IQuestion[]) => {
    const requireds = questions.filter((question) => question.required);

    let isCompleted = true;

    requireds.forEach((question) => {
        if (!questionComplete(question)) {
            isCompleted = false;
        }
    });
    return isCompleted;
};

export const questionComplete = (question: IQuestion) => {
    let isCompleted = true;
    const isSelected = question.alternatives.find(
        (alternative) => alternative.selected
    );
    if (!isSelected) {
        isCompleted = false;
    }

    return isCompleted;
};
