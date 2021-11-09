import {
    Avatar,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import * as React from 'react';
import LockOutlinedIcon from '@material-ui/icons/PeopleAlt';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadExperiments } from '../../../store/ducks/experiment';
import { ApplicationState } from '../../../store';
import Loading from '../../loading';
import { IModelType } from '../../../model/experiment';

const StyledContainer = styled.div`
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLogin = styled.div`
    background-color: #fafafa;
    width: 30%;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
`;

export interface ILoginExperimentProps {
    model?: string;
    data: { idExp: string; username: string };
    setData: (value: { idExp: string; username: string }) => void;
    login: () => void;
}

export function LoginExperiment({
    model,
    data,
    setData,
    login,
}: ILoginExperimentProps) {
    const dispatch = useDispatch();
    const experiments = useSelector(
        (store: ApplicationState) => store.experiments
    );

    React.useEffect(() => {
        dispatch(loadExperiments(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (model) {
            const experiment = experiments.data.find(
                (exp) => (exp.modelType as IModelType).abbreviation === model
            );

            experiment !== undefined &&
                setData({
                    ...data,
                    idExp: (experiment.modelType as IModelType).id,
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [experiments.loading]);

    return (
        <Loading isLoading={experiments.loading}>
            <StyledContainer>
                <StyledLogin>
                    <Avatar style={{ margin: 'auto' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography align="center" component="h1" variant="h5">
                        Ingreso al experimento
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        value={data.username}
                        onChange={(e) =>
                            setData({
                                ...data,
                                username: e.target.value as string,
                            })
                        }
                        label="Nombre de usuario"
                        name="user"
                        autoFocus
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ margin: '5px 0px 20px' }}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Modelo
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={data.idExp}
                            disabled={!!model}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    idExp: e.target.value as string,
                                })
                            }
                            label="Modelo"
                        >
                            <MenuItem value="" disabled>
                                <em>Selecciona un modelo</em>
                            </MenuItem>
                            {experiments.data.map((exp) => (
                                <MenuItem
                                    key={exp.id}
                                    value={(exp.modelType as IModelType).id}
                                >
                                    {(exp.modelType as IModelType).name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        onClick={login}
                        fullWidth
                        disabled={!data.idExp || !data.username}
                        variant="contained"
                        color="primary"
                    >
                        Ingresar
                    </Button>
                </StyledLogin>
            </StyledContainer>
        </Loading>
    );
}
