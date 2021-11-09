/* eslint-disable jsx-a11y/alt-text */
// Components
import { ApplicationState } from '../../../store';
import { parseTime } from '../../../utils/modules/convertTime';

// Librarys
import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CloseIcon from '@material-ui/icons/Close';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
    Theme,
    withStyles,
    WithStyles,
    Typography,
    IconButton,
    Button,
    Dialog,
    Divider,
    createStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import ImageIcon from '@material-ui/icons/Image';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

// Model props
export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

interface IModalQuizProps {
    quizIndex: number;
    nextStep: () => void;
    disabled: boolean;
}

export default function ModalQuiz({
    nextStep,
    disabled,
    quizIndex,
}: IModalQuizProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { questions, section, imageDetails } = useSelector(
        (state: ApplicationState) =>
            state.execution_experiment.data.quizzes[quizIndex]
    );

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<EventNoteIcon />}
                onClick={handleClickOpen}
                disabled={disabled}
            >
                Terminar cuestionarios
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography color="primary" variant="h4">
                        {section.title}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Typography color="primary" variant="h6" align="center">
                            Descripción de la evaluación
                        </Typography>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignContent: 'center',
                                textAlign: 'center',
                                color: '#ff0000',
                            }}
                        >
                            <AccessTimeIcon style={{ marginRight: '10px' }} />
                            <Typography>
                                Tiempo de Evaluación:{' '}
                                {parseTime(section.quizTime as number)} minutos
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignContent: 'center',
                                textAlign: 'center',
                                color: '#ff0000',
                                marginBottom: '10px',
                            }}
                        >
                            <ListAltIcon style={{ marginRight: '10px' }} />
                            <Typography>
                                Puntos Totales:{' '}
                                {questions.reduce<number>(
                                    (points, question) =>
                                        question.points
                                            ? points + question.points
                                            : points,
                                    0
                                )}{' '}
                                pts
                            </Typography>
                        </div>
                        <Typography>{section.description}</Typography>
                    </div>
                    <Divider style={{ margin: '10px 0px' }} />

                    <div className="imodel-evaluate">
                        <Typography variant="h6" align="center" color="primary">
                            Modelo evaluado
                        </Typography>

                        <div
                            className="image-details"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '10px',
                            }}
                        >
                            <div
                                className="details"
                                style={{ flexBasis: '60%' }}
                            >
                                <Typography color="textPrimary">
                                    {imageDetails?.title}
                                </Typography>
                                <Typography color="textSecondary">
                                    {imageDetails?.description}
                                </Typography>
                            </div>
                            <div
                                className="image-container"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: '10px',
                                }}
                            >
                                <div
                                    className="imagen"
                                    style={{
                                        boxShadow:
                                            '-10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
                                    }}
                                >
                                    <img
                                        loading="lazy"
                                        src={imageDetails!.pathImage}
                                        width="400"
                                    />
                                </div>

                                <Button
                                    startIcon={<ImageIcon />}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        window.open(
                                            imageDetails!.pathImage,
                                            '_blank'
                                        )
                                    }
                                >
                                    Abrir Imagen
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        autoFocus
                        onClick={() => {
                            setOpen(false);
                            nextStep();
                        }}
                        color="secondary"
                        size="small"
                        startIcon={<CheckCircleIcon />}
                    >
                        Realizar Evaluación
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
