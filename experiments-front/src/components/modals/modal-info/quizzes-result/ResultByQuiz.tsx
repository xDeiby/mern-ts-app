import { Divider, Typography } from '@material-ui/core';
import * as React from 'react';
import { IFormElements } from '../../../../model/experiment/IExecutionExperiment';
import { calculatePoints } from '../../../../utils/modules/calculatePoints';
import { parseTime } from '../../../../utils/modules/convertTime';
import { correctAnswers } from '../../../../utils/modules/correctAnswers';
import { QuestionResult } from '../../../results-quiz/QuestionResult';

export interface IResultByQuizProps {
    quiz: IFormElements;
}

export function ResultByQuiz({ quiz }: IResultByQuizProps) {
    return (
        <div>
            <Typography gutterBottom color="textSecondary">
                {`Tiempo de finalización: ${parseTime(
                    quiz.section.timeEnd as number
                )} ${
                    (quiz.section.timeEnd as number) < 60
                        ? 'segundos'
                        : 'minutos'
                }`}
            </Typography>
            <Typography gutterBottom color="textSecondary">
                {`Puntos Obtenidos: ${calculatePoints(quiz)} pts`}
            </Typography>
            <Typography gutterBottom color="textSecondary">
                {`Respuestas Correctas: ${correctAnswers(quiz.questions)} / ${
                    quiz.questions.length
                }`}
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            {quiz.questions.map((question) => (
                <QuestionResult key={question.id} question={question} />
            ))}{' '}
        </div>
    );
}
