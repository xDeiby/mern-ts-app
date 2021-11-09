// Components
import { ApplicationState } from '../../../store';
import { addRequest } from '../../../store/ducks/experiment';
import { createModelRequest, loadModels } from '../../../store/ducks/modelType';
import AddIcon from '@material-ui/icons/Add';

// Librarys
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
} from '@material-ui/core';
import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateExperiment({
    title,
    description,
    name,
}: {
    title: string;
    description: string;
    name: string;
}) {
    // States
    const [open, setOpen] = React.useState(false);
    const [newModel, setNewModel] = React.useState('');
    const [experimentData, setExperimentData] = React.useState({
        title: '',
        description: '',
        modelType: '',
    });

    // Store Management
    const modelTypes = useSelector(
        (state: ApplicationState) => state.modelTypes
    );
    const dispatch = useDispatch();

    // Methods
    const onCreate = async () => {
        setOpen(false);
        dispatch(addRequest(experimentData));
    };

    // Effect
    React.useEffect(() => {
        dispatch(loadModels(true));
    }, [dispatch]);

    return (
        <div id="modal-new-experiment" style={{ marginLeft: '20px' }}>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
            >
                {name}
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>

                    <Autocomplete
                        freeSolo
                        id="modelType"
                        disableClearable
                        loading={modelTypes.loading}
                        onChange={(e: any) => {
                            setNewModel('');
                            setExperimentData({
                                ...experimentData,
                                modelType: modelTypes.data.filter(
                                    (model) =>
                                        model.name === e.target.textContent
                                )[0].id,
                            });
                        }}
                        options={modelTypes.data}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tipo de modelo"
                                margin="normal"
                                onChange={(e: any) => {
                                    if (
                                        !modelTypes.data
                                            .map((model) => model.name)
                                            .includes(e.target.value)
                                    ) {
                                        setNewModel(e.target.value);
                                        console.log('entro');
                                    } else {
                                        setNewModel('');
                                        console.log('no entro');
                                    }
                                }}
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {newModel && (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    title="Nuevo modelo"
                                                    onClick={() => {
                                                        dispatch(
                                                            createModelRequest(
                                                                newModel
                                                            )
                                                        );
                                                        setNewModel('');
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Titulo del experimento"
                        name="title"
                        type="text"
                        onChange={({ currentTarget }) =>
                            setExperimentData({
                                ...experimentData,
                                title: currentTarget.value,
                            })
                        }
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Descripción del Experimento"
                        multiline
                        onChange={({ currentTarget }) =>
                            setExperimentData({
                                ...experimentData,
                                description: currentTarget.value,
                            })
                        }
                        rows={4}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => onCreate()}
                        color="primary"
                        disabled={
                            !experimentData.title ||
                            !experimentData.modelType ||
                            !experimentData.description
                        }
                    >
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
