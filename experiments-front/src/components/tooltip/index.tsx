// Components
import { ApplicationState } from '../../store';
import { ETypeQuestion, ETypeSection } from '../../model/experiment/enum-types';
import { IQuestion, ISection } from '../../model/experiment';
import { addRequestSection } from '../../store/ducks/experiment-management/sections';
import { addRequestQuestion } from '../../store/ducks/experiment-management/questions';
import {
    loadRequestCreateLogs,
    modifyLogRequest,
} from '../../store/ducks/experiment-management/log-changes';

// Librarys
import * as React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Fab, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SectionsPreview from '../modals/modal-info/sections-preview/SectionsPreview';

// Model Props
export interface ITooltipProps {
    section: ISection;
    typeForm: ETypeSection;
    newTab: () => void;
}

// Styles
const StyledTooltips = styled.div`
    position: fixed;
    right: 10px;
    bottom: 40%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    background-color: aliceblue;
    border-radius: 15px;
    -webkit-box-shadow: 5px 4px 16px 3px rgba(0, 0, 0, 0.4);
    box-shadow: 5px 4px 16px 3px rgba(0, 0, 0, 0.4);
`;

const StyledButtom = styled(Tooltip)`
    margin: 5px 0px;
`;

// Component
export default function TooltipView({
    section,
    typeForm,
    newTab,
}: ITooltipProps) {
    const dispatch = useDispatch();
    const { questionsLen, sectionsLen, log_changes } = useSelector(
        (state: ApplicationState) => ({
            questionsLen: state.questions_manage.data.filter(
                (question) => question.section === section.id
            ).length,
            sectionsLen: state.sections_manage.data.filter(
                (sect) => sect.type === typeForm
            ).length,
            log_changes: state.log_changes,
        })
    );

    // Methods
    const addSection = () => {
        const default_section: Omit<ISection, 'id'> = {
            title: `${nameSection()} ${sectionsLen + 1}`,
            description: `Descripción de la ${nameSection()} ${
                sectionsLen + 1
            }`,
            experiment: section.experiment,
            type: typeForm,
        };

        if (typeForm === ETypeSection.QUIZ) default_section.quizTime = 300;

        dispatch(addRequestSection(default_section));
        logModify();
        newTab();
    };

    const nameSection = () =>
        typeForm === ETypeSection.QUIZ ? 'Quiz' : 'Sección';

    const addQuestion = () => {
        const default_question: Omit<IQuestion, 'id'> = {
            question: `Pregunta ${questionsLen + 1}`,
            type: ETypeQuestion.SELECT,
            alternatives: [{ value: 'Opción 1' }],
            section: section.id,
            experiment: section.experiment,
            required: false,
        };

        if (typeForm === ETypeSection.QUIZ) {
            default_question.points = 5;
            default_question.alternatives[0].isCorrect = true;
            default_question.required = true;
        }

        dispatch(addRequestQuestion(default_question));
        logModify();
    };

    // log modify
    const logModify = () => {
        if (Object.keys(log_changes.data).length) {
            dispatch(
                modifyLogRequest({ ...log_changes.data, endDate: new Date() })
            );
        } else {
            dispatch(loadRequestCreateLogs(section.experiment));
        }
    };

    return (
        <StyledTooltips>
            <StyledButtom
                title={`Agregar ${nameSection()}`}
                aria-label="add"
                placement="left"
                onClick={addSection}
                arrow
            >
                <Fab color="primary" size="small">
                    <PlaylistAddIcon />
                </Fab>
            </StyledButtom>
            <StyledButtom
                title="Agregar Pregunta"
                aria-label="add"
                placement="left"
                arrow
                onClick={addQuestion}
            >
                <Fab color="primary" size="small">
                    <AddIcon />
                </Fab>
            </StyledButtom>
            <SectionsPreview typeSections={typeForm} />
        </StyledTooltips>
    );
}
