// Components
import ResultsModal from '../../modals/modal-info/quizzes-result';

// Librarys
import * as React from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SaveIcon from '@material-ui/icons/SaveRounded';
import {
    Container,
    Grid,
    TextField,
    Typography,
    makeStyles,
    IconButton,
} from '@material-ui/core';
import { SectionSelect } from '../stepper/select-section';
import { ETypeSection } from '../../../model/experiment/enum-types';
import { calculateAllPoints } from '../../../utils/modules/calculatePoints';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { modifyLocalExecutionExperimnt } from '../../../store/ducks/executionExperiment';
import { IExecutionExperiment } from '../../../model/experiment/IExecutionExperiment';
import api from '../../../utils/api.config';
import Spinner from '../../spinner';

// Model props
export interface IResultsViewProps {}

// Styles
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function ResultsView({ username }: { username: string }) {
    const [email, setEmail] = React.useState('');
    const [loadingEmail, setLoadingEmail] = React.useState(false);

    // Consts
    const quizzes = SectionSelect().allSections.filter(
        (element) => element.section.type === ETypeSection.QUIZ
    );

    const { id, userEmail } = useSelector(
        (store: ApplicationState) => store.execution_experiment.data
    );
    const dispatch = useDispatch();

    // Method

    const addEmail = async () => {
        setLoadingEmail(true);
        await api.put(`answers/${id}`, { userEmail: email });

        dispatch(
            modifyLocalExecutionExperimnt({
                userEmail: email,
            } as IExecutionExperiment)
        );
        setLoadingEmail(false);
    };

    const classes = useStyles();

    return (
        <div>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Felicitaciones {username}, has terminado la
                            evaluación
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            <p>
                                Has obtenido {calculateAllPoints(quizzes)}{' '}
                                puntos en total.
                            </p>
                            <p>
                                Si deseas obtener futuros resultados, puedes
                                ingresar tu correo electronico.
                            </p>
                        </Typography>
                        <div className={classes.heroButtons}>
                            <div>
                                <div className={classes.margin}>
                                    {loadingEmail ? (
                                        <Spinner />
                                    ) : (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                            }}
                                        >
                                            <Grid item>
                                                <MailOutlineIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    style={{
                                                        marginLeft: '5px',
                                                    }}
                                                    size="medium"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(
                                                            e.target
                                                                .value as string
                                                        )
                                                    }
                                                    type="email"
                                                    id="input-with-icon-grid"
                                                    label="Correo electronico"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    disabled={
                                                        !email ||
                                                        userEmail === email
                                                    }
                                                    onClick={addEmail}
                                                >
                                                    <SaveIcon />
                                                </IconButton>
                                            </Grid>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <ResultsModal quizzes={quizzes} />
                            </div>
                        </div>
                    </Container>
                </div>
            </main>
        </div>
    );
}
