import { IFormElements } from '../../model/experiment/IExecutionExperiment';

export const calculateAllPoints = (quizzes: IFormElements[]) =>
    quizzes.reduce<number>(
        (globalPoints, element) => globalPoints + calculatePoints(element),
        0
    );

export const calculatePoints = (quiz: IFormElements) =>
    quiz.questions.reduce<number>(
        (points, question) =>
            question.alternatives.find((alternative) => alternative.selected)
                ?.isCorrect
                ? points + (question.points as number)
                : points,
        0
    );
