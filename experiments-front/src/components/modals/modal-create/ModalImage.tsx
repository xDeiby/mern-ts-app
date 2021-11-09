/* eslint-disable jsx-a11y/alt-text */
import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, TextField, Typography } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SaveIcon from '@material-ui/icons/Save';
import { IImageModel, ISection } from '../../../model/experiment';
import { useDispatch } from 'react-redux';
import {
    createImageRequest,
    modifyImageRequest,
} from '../../../store/ducks/experiment-management/images-model';
import communicationModelVerify from '../../../utils/modules/comunication-model-verify';
import { TablePreview } from '../../accordion/TablePreview';

export interface IModalImageProps {
    quiz?: ISection;
    existImage?: IImageModel;
    buttonName: string;
    icon: ReactNode;
}

export default function ModalImage({
    quiz,
    existImage,
    buttonName,
    icon,
}: IModalImageProps) {
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState<
        { image: File; url: string } | undefined
    >();
    const [touched, setTouched] = React.useState(false);
    const [imageDetails, setImageDetails] = React.useState(
        existImage
            ? existImage
            : ({ quiz: quiz!.id, experiment: quiz!.experiment } as IImageModel)
    );

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        if (existImage) {
            setImageDetails(existImage);
            setImage(undefined);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const uploadImage = () => {
        const data = new FormData();

        image && data.append('file', image.image as File);
        data.append('title', imageDetails.title);
        data.append('description', imageDetails.description);
        data.append('modelJson', imageDetails.modelJson);
        data.append('quiz', imageDetails.quiz);
        data.append('experiment', imageDetails.experiment);

        existImage
            ? dispatch(modifyImageRequest({ data, id: existImage.id }))
            : dispatch(createImageRequest(data));
        setOpen(false);
    };

    const onChangeDetails = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setImageDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <React.Fragment>
            <Button
                variant="text"
                color="primary"
                id="modal-image"
                size="large"
                startIcon={icon}
                onClick={handleClickOpen}
            >
                {buttonName}
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={'xl'}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">
                    Modelo a evaluar
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese el título, descripción y el JSON correspondiente
                        a la imagen que va a seleccionar.
                    </DialogContentText>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            className="labels"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: '1 1 0',
                            }}
                        >
                            {' '}
                            <TextField
                                autoFocus
                                margin="dense"
                                required={true}
                                value={
                                    imageDetails.title ? imageDetails.title : ''
                                }
                                id="title"
                                name="title"
                                label="Título de de la imagen"
                                type="text"
                                onChange={onChangeDetails}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                required={true}
                                value={
                                    imageDetails.description
                                        ? imageDetails.description
                                        : ''
                                }
                                id="description"
                                name="description"
                                label="Descripción de la imagen"
                                type="text"
                                rows={2}
                                onChange={onChangeDetails}
                                multiline
                                fullWidth
                            />
                            <TextField
                                style={{ flexGrow: 1 }}
                                margin="dense"
                                required={true}
                                value={
                                    imageDetails.modelJson
                                        ? imageDetails.modelJson
                                        : ''
                                }
                                variant="filled"
                                id="modelJson"
                                name="modelJson"
                                label="JSON del modelo"
                                type="text"
                                error={
                                    touched &&
                                    communicationModelVerify(
                                        imageDetails.modelJson
                                    )
                                }
                                onClick={(e) => setTouched(true)}
                                rows={15}
                                helperText="Ingresar un JSON válido de Análisis Comunicacional"
                                onChange={onChangeDetails}
                                multiline
                                fullWidth
                            />
                        </div>
                        <figure style={{ flex: '1 1 0' }}>
                            <img
                                src={
                                    existImage && !image
                                        ? existImage.pathImage
                                        : image?.url
                                }
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    margin: 'auto',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </figure>
                    </div>
                    {!communicationModelVerify(imageDetails.modelJson) && (
                        <div className="model-preview">
                            <Typography variant="h6">
                                Previsualización de datos del modelo
                            </Typography>
                            <hr />
                            <TablePreview jsonModel={imageDetails.modelJson} />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        name="image"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImage({
                                    image: e.target.files[0],
                                    url: URL.createObjectURL(e.target.files[0]),
                                });
                            }
                        }}
                        type="file"
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="secondary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClose}
                    >
                        cancelar
                    </Button>

                    {existImage ? (
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={
                                imageDetails.title === existImage.title &&
                                imageDetails.description ===
                                    existImage.description &&
                                imageDetails.modelJson ===
                                    existImage.modelJson &&
                                !image
                            }
                            onClick={uploadImage}
                            startIcon={<SaveIcon />}
                        >
                            Modificar
                        </Button>
                    ) : (
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={
                                !imageDetails.title ||
                                !imageDetails.description ||
                                communicationModelVerify(
                                    imageDetails.modelJson
                                ) ||
                                !image
                            }
                            onClick={uploadImage}
                            startIcon={<SaveIcon />}
                        >
                            Guardar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
