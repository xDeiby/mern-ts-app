import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import api from '../../utils/api.config';
import { ILogChanges } from '../../model/experiment';
import { AxiosResponse } from 'axios';
import Loading from '../loading';
import { ETypeChange } from '../../model/experiment/enum-types';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function LogExperiment() {
    const classes = useStyles();

    const [data, setData] = React.useState<ILogChanges[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { id } = useParams<{ id: string }>();

    // TODO: Pasar a redux
    React.useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const result: AxiosResponse<ILogChanges[]> = await api.get(
                    `logs?idExperiment=${id}`
                );
                setData(result.data);
            } catch (error) {
                setData([]);
            }
            setLoading(false);
        };

        getData();
    }, [id]);

    const getDatePart = (date: Date): string[] =>
        date.toLocaleString().split(' ');

    return (
        <Loading isLoading={loading}>
            {data.length ? (
                <div
                    style={{
                        width: '80%',
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '20px 0px',
                    }}
                >
                    {
                        <Timeline align="alternate">
                            {data.map((change) => (
                                <TimelineItem key={change.id}>
                                    <TimelineOppositeContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {`${
                                                getDatePart(
                                                    new Date(
                                                        change.creationDate as string
                                                    )
                                                )[0]
                                            } ${
                                                getDatePart(
                                                    new Date(
                                                        change.creationDate as string
                                                    )
                                                )[1]
                                            }`}
                                        </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot>
                                            <FastfoodIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Paper
                                            elevation={3}
                                            className={classes.paper}
                                        >
                                            <Typography
                                                variant="h6"
                                                component="h1"
                                            >
                                                {change.name}
                                            </Typography>
                                            <Typography>
                                                {change.typeChanges ===
                                                ETypeChange.IMPORTANT
                                                    ? 'Cambios importantes'
                                                    : 'Cambios menores'}
                                            </Typography>
                                        </Paper>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    }
                </div>
            ) : (
                <div
                    style={{
                        height: '80vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textSecondary"
                    >
                        No hay cambios
                    </Typography>
                </div>
            )}
        </Loading>
    );
}
