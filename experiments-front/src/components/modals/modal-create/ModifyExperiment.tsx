import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { IExperiment } from '../../../model/experiment';
import { useDispatch } from 'react-redux';
import { modifyExperimentRequest } from '../../../store/ducks/experiment-management/experiment';

export interface IModifyExperimentProps {
    experiment: IExperiment;
}

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

export function ModifyExperiment({ experiment }: IModifyExperimentProps) {
    const [open, setOpen] = React.useState(false);
    const [fields, setFields] = React.useState({
        title: experiment.title,
        description: experiment.description,
    });

    const dispatch = useDispatch();

    const handleClose = () => setOpen(false);

    const modify = () => {
        const m_exp = { ...fields, id: experiment.id } as IExperiment;
        dispatch(modifyExperimentRequest(m_exp));
    };

    return (
        <div>
            {/* Init Experiment */}
            <StyledDivConfig
                onClick={() => {
                    setOpen(true);
                }}
            >
                <TextFieldsIcon style={{ fontSize: '2.5em' }} />
                <strong>Modificar Experimento</strong>
            </StyledDivConfig>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                maxWidth={'sm'}
                fullWidth
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {/* Title */}
                <DialogTitle id="scroll-dialog-title">
                    Editar datos del Experimento
                </DialogTitle>

                {/* Terms description */}
                <DialogContent dividers={true}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Titulo del experimento"
                        name="title"
                        type="text"
                        value={fields.title}
                        onChange={({ currentTarget }) =>
                            setFields({
                                ...fields,
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
                        value={fields.description}
                        onChange={({ currentTarget }) =>
                            setFields({
                                ...fields,
                                description: currentTarget.value,
                            })
                        }
                        rows={4}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={modify}
                        color="primary"
                        disabled={
                            !fields.title?.trim() ||
                            !fields.description?.trim() ||
                            (fields.title === experiment.title &&
                                fields.description === experiment.description)
                        }
                    >
                        Modificar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
