import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import {
    Button,
    createStyles,
    Dialog,
    Fab,
    Step,
    StepLabel,
    Stepper,
    Theme,
    Tooltip,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { ETypeSection } from '../../../../model/experiment/enum-types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import QuestionView from '../../../experiment-manage/survey-and-quiz/question/QuestionView';
import SectionView from '../../../experiment-manage/survey-and-quiz/section/SectionView';

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

export default function SectionsPreview({
    typeSections,
}: {
    typeSections: ETypeSection;
}) {
    const [open, setOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState(0);

    const { sections, questions } = useSelector((state: ApplicationState) => ({
        sections: state.sections_manage.data.filter(
            (sect) => sect.type === typeSections
        ),
        questions: state.questions_manage.data,
    }));

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleBack = () => {
        setActiveSection((prev) => prev - 1);
    };

    const handleNext = () => {
        setActiveSection((prev) => prev + 1);
    };

    return (
        <div>
            <Tooltip
                style={{ margin: '5px 0px' }}
                title="Ver"
                aria-label="add"
                placement="left"
                arrow
                onClick={handleClickOpen}
            >
                <Fab color="secondary" size="small">
                    <VisibilityIcon />
                </Fab>
            </Tooltip>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="xl"
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {typeSections === ETypeSection.QUIZ
                        ? 'Evaluaciones'
                        : 'Encuestas'}
                </DialogTitle>
                <DialogContent dividers>
                    {/* Header stepper */}
                    <Stepper activeStep={activeSection} alternativeLabel>
                        {sections.map((sect) => (
                            <Step key={sect.id}>
                                <StepLabel>{sect.title}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {/* Content */}
                    <div style={{ margin: '10px 200px' }} className="content">
                        <SectionView section={sections[activeSection]} />
                        {questions
                            .filter(
                                (question) =>
                                    question.section ===
                                    sections[activeSection].id
                            )
                            .map((question) => (
                                <QuestionView
                                    key={question.id}
                                    question={question}
                                />
                            ))}
                        {/* Footer */}
                        <Button
                            disabled={activeSection === 0}
                            onClick={handleBack}
                            startIcon={<ArrowBackIcon />}
                        >
                            Atras
                        </Button>
                        <Button
                            disabled={activeSection === sections.length - 1}
                            onClick={handleNext}
                            color="primary"
                            startIcon={<ArrowForwardIcon />}
                        >
                            Siguiente
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
