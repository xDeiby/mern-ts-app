// Components
import { IFormElements } from '../../../../model/experiment/IExecutionExperiment';

// Librarys
import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {
    Button,
    createStyles,
    Dialog,
    Tab,
    Tabs,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { ResultByQuiz } from './ResultByQuiz';

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

interface IResultsModalProps {
    quizzes: IFormElements[];
}

export default function ResultsModal({ quizzes }: IResultsModalProps) {
    const [open, setOpen] = React.useState(false);
    const [activeQuiz, setActiveQuiz] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Ver Resultados
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="xl"
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Resultados de la evaluación
                </DialogTitle>
                <DialogContent dividers>
                    <Tabs
                        value={activeQuiz}
                        onChange={(e: React.ChangeEvent<{}>, newQuiz: number) =>
                            setActiveQuiz(newQuiz)
                        }
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        {quizzes.map(({ section }) => (
                            <Tab key={section.id} label={section.title} />
                        ))}
                    </Tabs>

                    <ResultByQuiz quiz={quizzes[activeQuiz]} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
