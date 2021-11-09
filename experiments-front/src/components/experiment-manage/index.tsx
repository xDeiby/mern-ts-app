// Components
import Loading from '../loading';
import FormManagement from './survey-and-quiz';
import { ApplicationState } from '../../store';
import { loadRequestExperimentManage } from '../../store/ducks/experiment-management/experiment';

// Librarys
import * as React from 'react';
import styled from 'styled-components';
import SettingsIcon from '@material-ui/icons/Settings';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IModelType } from '../../model/experiment';
import CreateTerms from '../modals/modal-create/CreateTerms';
import { ModifyExperiment } from '../modals/modal-create/ModifyExperiment';

// Views to management
export enum EViewManage {
    SURVEY,
    QUIZ,
    EXPERIMENT,
}

const StyledHero = styled.div`
    height: 80vh;
    width: 60%;
    margin: 10vh auto 0;
`;

const StyledDivConfig = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 240px;
    align-items: center;
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
    &:hover {
        /* font-size: 1.1em; */
        transition: linear 0.2s;
        cursor: pointer;
        color: #3f51b5;
        box-shadow: 5px 5px 10px #3f51b58d;
    }
`;

// Component
export default function ExperimentManage({
    setTitle,
}: {
    setTitle: (title: string) => void;
}) {
    // States
    const [view, setView] = React.useState<EViewManage>(EViewManage.EXPERIMENT);

    // Path param
    const id = useParams<{ id: string }>().id;

    // Store Mnanagement
    const dispatch = useDispatch();
    const currentExperiment = useSelector(
        (state: ApplicationState) => state.experiment_manage
    );

    // Effects
    React.useEffect(() => {
        if (id !== currentExperiment.data.id) {
            dispatch(loadRequestExperimentManage(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    React.useEffect(() => {
        switch (view) {
            case EViewManage.EXPERIMENT:
                setTitle('Administrar Experimento');
                break;
            case EViewManage.SURVEY:
                setTitle('Administrar Encuestas');
                break;

            case EViewManage.QUIZ:
                setTitle('Administrar Evaluaciones');
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view]);

    // Switch view component

    // Manage Sections
    if (view === EViewManage.SURVEY || view === EViewManage.QUIZ) {
        return (
            <>
                {/* <MenuBar /> */}
                <div style={{ height: '30px' }}></div>
                <div
                    style={{
                        width: '60%',
                        margin: 'auto',
                    }}
                >
                    <FormManagement
                        setMainView={() => {
                            setView(EViewManage.EXPERIMENT);
                        }}
                        idExperiment={id}
                        typeForm={view as number}
                    />
                </div>
            </>
        );

        // Experiment Manage
    } else {
        return (
            <>
                {/* <MenuBar /> */}
                <Loading isLoading={currentExperiment.loading}>
                    <StyledHero>
                        {currentExperiment.data.modelType && (
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                {
                                    (
                                        currentExperiment.data
                                            .modelType as IModelType
                                    ).name
                                }
                            </Typography>
                        )}

                        <Typography
                            component="h3"
                            variant="h3"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            {currentExperiment.data.title}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            {currentExperiment.data.description}
                        </Typography>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                flexWrap: 'wrap',
                                marginTop: '50px',
                            }}
                        >
                            <StyledDivConfig
                                onClick={() => {
                                    setView(EViewManage.SURVEY);
                                }}
                            >
                                <SettingsIcon style={{ fontSize: '2.5em' }} />
                                <strong>Configurar Encuestas</strong>
                            </StyledDivConfig>
                            <CreateTerms experiment={currentExperiment.data} />

                            <ModifyExperiment
                                experiment={currentExperiment.data}
                            />

                            <StyledDivConfig
                                onClick={() => {
                                    setView(EViewManage.QUIZ);
                                }}
                            >
                                <SettingsIcon style={{ fontSize: '2.5em' }} />
                                <strong>Configurar Evaluación</strong>
                            </StyledDivConfig>
                        </div>
                    </StyledHero>
                </Loading>
            </>
        );
    }
}
