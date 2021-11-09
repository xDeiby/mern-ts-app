import { Box, Divider, Radio, Typography } from '@material-ui/core';
import * as React from 'react';
import { IQuestion } from '../../model/experiment';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export interface IQuestionResultProps {
    question: IQuestion;
}

export function QuestionResult({ question }: IQuestionResultProps) {
    return (
        <Box
            p={3}
            boxShadow={2}
            style={{
                backgroundColor: question.alternatives.find(
                    (alternative) =>
                        alternative.isCorrect && alternative.selected
                )
                    ? 'rgba(0, 255, 49, 0.11)'
                    : 'rgba(255, 0, 0, 0.08)',
                marginBottom: '15px',
            }}
        >
            <Typography variant="subtitle1" gutterBottom>
                {question.question}
            </Typography>
            {question.alternatives.map((alternative, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {alternative.isCorrect ? (
                        <CheckIcon
                            fontSize="small"
                            style={{ color: '#00ff33' }}
                        />
                    ) : (
                        <CloseIcon fontSize="small" color="secondary" />
                    )}

                    <Radio
                        size="small"
                        disabled
                        checked={alternative.selected ? true : false}
                    />
                    {alternative.value}
                </div>
            ))}

            {question.explanation && (
                <div style={{ marginTop: '10px' }}>
                    <Divider />
                    <Typography style={{ padding: '10px' }} variant="subtitle2">
                        {question.explanation}
                    </Typography>
                </div>
            )}
        </Box>
    );
}
