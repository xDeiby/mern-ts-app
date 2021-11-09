/* eslint-disable jsx-a11y/alt-text */
import { Divider, Typography } from '@material-ui/core';
import * as React from 'react';
import { IImageModel } from '../../../../model/experiment';
import ModalImage from '../../../modals/modal-create/ModalImage';
import SettingsIcon from '@material-ui/icons/Settings';

export interface IImageQuizViewProps {
    image: IImageModel;
}

export default function ImageQuizView({ image }: IImageQuizViewProps) {
    // const dispatch = useDispatch();

    // const remove = () => {
    //     dispatch(removeImageRequest(image.id));
    // };

    return (
        <div
            style={{
                padding: '15px',
                boxSizing: 'content-box',
                marginBottom: '20px',
                borderRadius: '15px',
                WebkitBoxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                boxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                borderLeft: 'solid 5px #3F51B5',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <img
                loading="lazy"
                src={image.pathImage}
                height="150"
                style={{ display: 'block' }}
            />
            <div style={{ marginLeft: '10px' }}>
                <Typography variant="h5">{image.title}</Typography>
                <Divider />
                <Typography variant="subtitle1" color="textSecondary">
                    {image.description}
                </Typography>
                <div>
                    <ModalImage
                        existImage={image}
                        buttonName="Modificar"
                        icon={<SettingsIcon />}
                    />
                    {/* <IconButton aria-label="delete" onClick={remove}>
                        <DeleteIcon />
                    </IconButton> */}
                </div>
            </div>
        </div>
    );
}
