import * as React from 'react';
import { ETypeSection } from '../../../../model/experiment/enum-types';
import QuizFormView from '../../../form-manage/quiz';
import SurveyFormView from '../../../form-manage/survey';
import StepperButtons from '../buttons';
import { SectionSelect } from '../select-section';

export default function TypeForm() {
    const { sectionElements } = SectionSelect();

    return (
        <div
            style={{
                width: '70%',
                margin: 'auto',
                marginTop: '20px',
            }}
        >
            {/* Component */}
            {sectionElements && (
                <div>
                    {sectionElements.section.type === ETypeSection.SURVEY ? (
                        <SurveyFormView survey={sectionElements} />
                    ) : (
                        <QuizFormView />
                    )}
                </div>
            )}

            {/* Buttons */}
            <StepperButtons />
        </div>
    );
}
