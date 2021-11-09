// Components
import Loading from '../../loading';
import TooltipView from '../../tooltip';
import LogModifys from '../../log-modifys';
import { ApplicationState } from '../../../store';
import { loadQuestions } from '../../../store/ducks/experiment-management/questions';
import { loadSections } from '../../../store/ducks/experiment-management/sections';
import { ETypeSection } from '../../../model/experiment/enum-types';
import { Section } from './section';
import { arrayEquals } from '../../../utils/modules/compare';
import { Question } from './question';

// Librarys
import React from 'react';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {
    AppBar,
    Box,
    Button,
    makeStyles,
    Tab,
    Tabs,
    Theme,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ImageQuiz from './image-quiz';
import { loadRequestImagesManage } from '../../../store/ducks/experiment-management/images-model';

// Model Params
export interface ExperimentManageProps {
    setMainView: () => void;
    idExperiment: string;
    typeForm: ETypeSection;
}

// Styles
export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

// Components

export function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export default function FormManage(props: ExperimentManageProps) {
    // Const and States
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const { idExperiment, typeForm } = props;

    // Store Management
    const dispatch = useDispatch();
    const form = useSelector((state: ApplicationState) => ({
        sections: state.sections_manage,
        questions: state.questions_manage,
        images: state.images_manage,
        changes: state.log_changes,
    }));

    const { sections, questions } = form;

    // Effects
    React.useEffect(() => {
        if (
            (sections.data.length === 0 && questions.data.length === 0) ||
            !sections.data
                .map((section) => section.experiment)
                .find((id) => id === idExperiment)
        ) {
            dispatch(loadSections(idExperiment));
            dispatch(loadQuestions(idExperiment));
            dispatch(loadRequestImagesManage(idExperiment));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, idExperiment]);

    // Methods
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const onNewTab = () => {
        setValue(
            sections.data.filter((section) => section.type === typeForm).length
        );
    };

    const is_modify = () => {
        const original_sections = sessionStorage.getItem('original_sections');
        const original_questions = sessionStorage.getItem('original_questions');

        if (
            original_sections &&
            original_questions &&
            !sections.loading &&
            !questions.loading
        ) {
            const is_equal1 = arrayEquals(
                questions.data,
                JSON.parse(original_questions)
            );
            const is_equal2 = arrayEquals(
                sections.data,
                JSON.parse(original_sections)
            );

            return is_equal1 && is_equal2;
        }
        return false;
    };

    // Component
    return (
        <Loading isLoading={sections.loading}>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant={
                            sections.data.filter(
                                (section) => section.type === typeForm
                            ).length >= 5
                                ? 'scrollable'
                                : 'fullWidth'
                        }
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        centered
                    >
                        {sections.data
                            .filter((section) => section.type === typeForm)
                            .map((section, index) => (
                                <Tab
                                    key={section.id}
                                    label={`${
                                        typeForm === ETypeSection.SURVEY
                                            ? 'Sección'
                                            : 'Quiz'
                                    } ${index + 1}`}
                                    {...a11yProps(index)}
                                />
                            ))}
                    </Tabs>
                </AppBar>

                {sections.data
                    .filter((section) => section.type === typeForm)
                    .map((section, index) => (
                        <TabPanel value={value} index={index} key={section.id}>
                            {/* Section Elements */}
                            <Section
                                section={section}
                                setTabActive={(tab: number) => setValue(tab)}
                            />

                            {/* Image Elements of quiz */}
                            {typeForm === ETypeSection.QUIZ && (
                                <ImageQuiz quiz={section} />
                            )}

                            {/* Question Elements */}
                            <Loading isLoading={questions.loading}>
                                {questions.data
                                    .filter(
                                        (question) =>
                                            question.section === section.id
                                    )
                                    .map((question) => (
                                        <Question
                                            key={question.id}
                                            question={question}
                                        />
                                    ))}
                            </Loading>
                            <TooltipView
                                newTab={onNewTab}
                                section={section}
                                typeForm={typeForm}
                            />
                        </TabPanel>
                    ))}

                <Button
                    color="primary"
                    id="back-experiment"
                    startIcon={<KeyboardArrowLeftIcon />}
                    style={{ marginLeft: '25px', marginBottom: '20px' }}
                    onClick={() => props.setMainView()}
                >
                    Atras
                </Button>
            </div>
            {/* <SpeedDial /> */}
            <LogModifys aviable={is_modify()} log={form.changes.data} />
        </Loading>
    );
}

// Tab props
export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

// Tab Component
export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}
