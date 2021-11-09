// Librarys
import React from 'react';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
    FormControlLabel,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { modifyLocalExecutionExperimnt } from '../../../store/ducks/executionExperiment';
import { IExecutionExperiment } from '../../../model/experiment/IExecutionExperiment';

// Model Props
interface IModalTermsProps {
    acepted: () => void;
    terms: string;
    username: string;
}

// Component
export default function ModalTerms({
    acepted,
    terms,
    username,
}: IModalTermsProps) {
    // States
    const [open, setOpen] = React.useState(false);
    const [isAcepted, setIsAcepted] = React.useState(false);

    // Methods
    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const descriptionElementRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            {/* Init Experiment */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen('paper')}
            >
                Iniciar Experimento
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {/* Title */}
                <DialogTitle id="scroll-dialog-title">
                    Terminos y Condiciones
                </DialogTitle>

                {/* Terms description */}
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {terms}
                    </DialogContentText>
                </DialogContent>
                {/* Checkbox to accept conditions */}
                <div style={{ marginLeft: '20px' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAcepted}
                                onChange={({ target }) =>
                                    setIsAcepted(target.checked)
                                }
                                name="checkedB"
                                color="primary"
                                size="small"
                            />
                        }
                        label="Estoy de acuerdo y acepto los terminos y condiciones"
                    />
                </div>

                {/* Acept or Decline */}
                <DialogActions>
                    <Button
                        color="secondary"
                        onClick={handleClose}
                        startIcon={<CancelOutlinedIcon />}
                    >
                        No Acepto
                    </Button>
                    <Button
                        startIcon={<CheckCircleOutlineOutlinedIcon />}
                        onClick={() => {
                            dispatch(
                                modifyLocalExecutionExperimnt({
                                    userName: username,
                                } as IExecutionExperiment)
                            );
                            setOpen(false);
                            acepted();
                        }}
                        color="primary"
                        disabled={!isAcepted}
                    >
                        Acepto
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
