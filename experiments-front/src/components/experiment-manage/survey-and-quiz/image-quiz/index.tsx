import * as React from 'react';
import { IImageModel, ISection } from '../../../../model/experiment';
import ModalImage from '../../../modals/modal-create/ModalImage';
import ImageQuizView from './ImageQuizView';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import Spinner from '../../../spinner';

export interface IImageQuizProps {
    quiz: ISection;
}

export default function ImageQuiz({ quiz }: IImageQuizProps) {
    const images = useSelector(
        (state: ApplicationState) => state.images_manage
    );

    const getImage = () => images.data.find((img) => img.quiz === quiz.id);

    return !getImage() ? (
        <div
            style={{
                padding: '15px',
                boxSizing: 'content-box',
                marginBottom: '20px',
                borderRadius: '15px',
                WebkitBoxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                boxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                color: '#8591D0',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {images.loading ? (
                <Spinner />
            ) : (
                <ModalImage
                    quiz={quiz}
                    buttonName="Agregar Imagen"
                    icon={<AddPhotoAlternateIcon />}
                />
            )}
        </div>
    ) : images.loading ? (
        <div
            style={{
                padding: '15px',
                boxSizing: 'content-box',
                marginBottom: '20px',
                borderRadius: '15px',
                WebkitBoxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                boxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                color: '#8591D0',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {' '}
            <Spinner />{' '}
        </div>
    ) : (
        <ImageQuizView image={getImage() as IImageModel} />
    );
}
