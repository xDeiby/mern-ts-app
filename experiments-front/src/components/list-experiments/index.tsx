// Components
import CardExperiment from '../card-experiment';
import CreateExperiment from '../modals/modal-create/CreateExperiment';
import { ApplicationState } from '../../store';
import { loadExperiments } from '../../store/ducks/experiment';
import Loading from '../loading';

// Librarys
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

export default function ListExperiment() {
    // Store Management
    const experiments = useSelector(
        (state: ApplicationState) => state.experiments
    );
    const dispatch = useDispatch();

    // UseEffect
    React.useEffect(() => {
        dispatch(loadExperiments(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // Component
    return (
        // Loading Context
        <Loading isLoading={experiments.loading}>
            {/* List Content */}
            {experiments.data.length ? (
                <div>
                    <div
                        id="card-experiments"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            flexWrap: 'wrap',
                            flexBasis: '200px',
                            padding: 20,
                        }}
                    >
                        {/* Content */}
                        {experiments.data.map((experiment) => (
                            <CardExperiment
                                key={experiment.id}
                                experiment={experiment}
                            />
                        ))}
                    </div>

                    <CreateExperiment
                        name={'Nuevo Experimento'}
                        title={'Crear Experimento'}
                        description={
                            'Para crear un experimento ingrese el nombre del experimento, su descripción y el tipo de modelo al que pertenece'
                        }
                    />
                </div>
            ) : (
                <div
                    style={{
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        style={{ marginBottom: '10px' }}
                        component="h1"
                        variant="h4"
                        color="textSecondary"
                    >
                        No hay experimentos
                    </Typography>
                    <CreateExperiment
                        name={'Nuevo Experimento'}
                        title={'Crear Experimento'}
                        description={
                            'Para crear un experimento ingrese el nombre del experimento, su descripción y el tipo de modelo al que pertenece'
                        }
                    />
                </div>
            )}
        </Loading>
    );
}
