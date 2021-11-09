// Components
import { IExperiment, IModelType } from '../../model/experiment';
import { Routes } from '../../utils/routes.config';

// Librarys
import React from 'react';
import { useHistory } from 'react-router';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    makeStyles,
    Typography,
} from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';

// Styles
const useStyles = makeStyles({
    root: {
        width: '30%',
        flex: '1 0 300px',
        marginRight: '20px',
        marginTop: '20px',
        WebkitBoxShadow: '3px 3px 10px -4px rgba(0,0,0,0.73)',
        boxShadow: '3px 3px 10px -4px rgba(0,0,0,0.73)',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
        borderRadius: '10px',
        WebkitBoxShadow: '7px 7px 15px -4px rgba(0,0,0,0.73)',
        boxShadow: ' 7px 7px 15px -4px rgba(0,0,0,0.73)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

// Model Params
interface CardExperimentProps {
    experiment: IExperiment;
}

// Parser Date
function yymmdd(date: Date) {
    const date_m = new Date(date);
    var mm = date_m.getMonth() + 1; // getMonth() is zero-based
    var dd = date_m.getDate();

    return [
        date_m.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
    ].join('/');
}

// Component
export default function CardExperiment(props: CardExperimentProps) {
    const { experiment } = props;
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                {/* Header */}
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {Object.keys(experiment.modelType).includes('name') &&
                    (experiment.modelType as IModelType).name
                        ? (experiment.modelType as IModelType).name
                        : 'Class Diagram'}
                </Typography>

                {/* Title */}
                <Typography variant="h5" component="h2">
                    {experiment.title}
                </Typography>

                {/* Date */}
                <Typography className={classes.pos} color="textSecondary">
                    Creado el {yymmdd(experiment.creationDate)}
                </Typography>

                {/* Description */}
                <Typography variant="body2" component="p">
                    {experiment.description}
                </Typography>
            </CardContent>

            {/* List Buttons */}
            <CardActions
                style={{ display: 'flex', justifyContent: 'space-around' }}
            >
                <Button
                    size="small"
                    color="primary"
                    startIcon={<SettingsIcon />}
                    onClick={() =>
                        history.push(`${Routes.experiments}/${experiment.id}`)
                    }
                >
                    Administrar
                </Button>
                <Button
                    size="small"
                    color="secondary"
                    startIcon={<HistoryIcon />}
                    onClick={() =>
                        history.push(`${Routes.modifys}/${experiment.id}`)
                    }
                >
                    Ver Cambios
                </Button>
            </CardActions>
        </Card>
    );
}
