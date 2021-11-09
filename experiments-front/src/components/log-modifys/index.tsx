// Components
import { ILogChanges } from '../../model/experiment';
import { ETypeChange } from '../../model/experiment/enum-types';
import { modifyLogRequest } from '../../store/ducks/experiment-management/log-changes';

// Librarys
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import {
    Fab,
    MenuItem,
    Button,
    Select,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    createStyles,
    Theme,
    makeStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

// Styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            position: 'fixed',
            bottom: 2,
            right: '5%',
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        items: {
            marginBottom: '10px',
        },
    })
);

// Model props
export interface ILogModifysProps {
    aviable: boolean;
    log: ILogChanges;
}

// Component
export default function LogModifys(props: ILogModifysProps) {
    // States
    const [open, setOpen] = React.useState<boolean>(false);
    const [config, setConfig] = React.useState<ILogChanges>(props.log);

    // Methods
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Effect
    React.useEffect(() => {
        setConfig(props.log);
    }, [props.log]);

    // Store MAnagement
    const dispatch = useDispatch();

    // Methods
    const saveChanges = () => {
        dispatch(modifyLogRequest(config));
        setOpen(false);
    };

    // Hooks
    const classes = useStyles();

    return (
        <div>
            <Fab
                id="changes-experiment"
                variant="extended"
                color="primary"
                aria-label="add"
                size="medium"
                disabled={props.aviable}
                className={classes.margin}
                onClick={handleClickOpen}
            >
                <SettingsIcon className={classes.extendedIcon} />
                Cambios
            </Fab>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Modificación de Cambios
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Puede asignar un título y una etiqueta a sus cambios, de
                        lo contario se tomaran en cuenta los valores por
                        defecto.
                    </DialogContentText>
                    <TextField
                        className={classes.items}
                        autoFocus
                        margin="dense"
                        value={config.name}
                        onChange={(e) =>
                            setConfig({
                                ...config,
                                name: e.currentTarget.value,
                            })
                        }
                        id="name"
                        label="Nombre de los cambios"
                        type="text"
                        fullWidth
                    />

                    <Select
                        className={classes.items}
                        labelId="demo-simple-select-label"
                        id="type-question-select"
                        value={config.typeChanges}
                        onChange={(e) =>
                            setConfig({
                                ...config,
                                typeChanges: e.target.value as ETypeChange,
                            })
                        }
                        fullWidth
                        // onChange={(e) =>
                        //     setQuestionElements({
                        //         ...questionElements,
                        //         type: e.target.value as ETypeQuestion,
                        //     })
                        // }
                    >
                        <MenuItem value={ETypeChange.SHORT}>
                            Cambios menores
                        </MenuItem>
                        <MenuItem value={ETypeChange.IMPORTANT}>
                            Cambios Importantes
                        </MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Salir
                    </Button>
                    <Button onClick={saveChanges} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
