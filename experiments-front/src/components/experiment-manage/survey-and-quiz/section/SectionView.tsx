// Components
import { Chip, Divider, Typography } from '@material-ui/core';
import { parseTime } from '../../../../utils/modules/convertTime';
import { ISection } from '../../../../model/experiment';

// Librarys
import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import TimerIcon from '@material-ui/icons/Timer';

export interface ISectionViewProps {
    section: ISection;
}

export default function SectionView(props: ISectionViewProps) {
    const { section } = props;

    // Component
    return (
        <div
            style={{
                padding: '30px',
                boxSizing: 'content-box',
                marginBottom: '20px',
                backgroundColor: '#3f51b5',
                borderRadius: '15px',
                WebkitBoxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                boxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                color: 'white',
            }}
        >
            {section.quizTime && (
                <Chip
                    style={{ float: 'right' }}
                    icon={<TimerIcon />}
                    label={`${parseTime(section.quizTime)} minutos`}
                    // clickable
                    color="primary"
                    // onDelete={handleDelete}
                    deleteIcon={<DoneIcon />}
                    variant="outlined"
                />
            )}

            <Typography variant={'h5'} gutterBottom align="center">
                {section.title}
            </Typography>
            <Divider />
            <Typography variant={'subtitle1'} gutterBottom align="center">
                {section.description}
            </Typography>
        </div>
    );
}
