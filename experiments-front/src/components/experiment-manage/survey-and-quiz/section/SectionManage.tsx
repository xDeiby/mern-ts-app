// Components
import RemoveElement from '../../../float-buttons/RemoveElement';
import SaveChanges from '../../../float-buttons/SaveChanges';
import { ISection } from '../../../../model/experiment';
import { ETypeSection } from '../../../../model/experiment/enum-types';
import {
    EActionSections,
    modifyRequestSection,
    removeRequestSection,
} from '../../../../store/ducks/experiment-management/sections';
import { objectEquals } from '../../../../utils/modules/compare';
import { parseInverse, parseTime } from '../../../../utils/modules/convertTime';

// Librarys
import React from 'react';
import MaskedInput from 'react-text-mask';
import { FormControl, Input, InputLabel, TextField } from '@material-ui/core';

// Model props
export interface ISectionManageProps {
    section: ISection;
    setTabActive: (tab: number) => void;
}

// Model Mask
interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

// Components
function TextMaskCustom(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[
                /^([0-1]?[0-9]|2[0-5])/,
                /\d/,
                ':',
                /\d/,
                /\d/,
                /[0-5][0-9]$/,
            ]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

export default function SectionManage(props: ISectionManageProps) {
    // State
    const [sectionElements, setSectionElements] = React.useState<ISection>(
        props.section
    );

    const changeTime = (time: number) => {
        if (time > 300) {
            setSectionElements({ ...sectionElements, quizTime: time });
        } else {
            setSectionElements({ ...sectionElements, quizTime: 300 });
        }
    };

    // Component
    return (
        <div
            style={{
                padding: '30px',
                marginBottom: '20px',
                backgroundColor: 'white',
                borderRadius: '15px',
                WebkitBoxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                boxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
            }}
        >
            <TextField
                autoFocus
                margin="dense"
                id="title-section"
                label="Titulo de la Sección"
                type="text"
                value={sectionElements.title}
                onChange={({ currentTarget }) =>
                    setSectionElements({
                        ...sectionElements,
                        title: currentTarget.value,
                    })
                }
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="description-section"
                label="Descripción de la Sección"
                type="text"
                multiline
                rows={4}
                value={sectionElements.description}
                onChange={({ currentTarget }) =>
                    setSectionElements({
                        ...sectionElements,
                        description: currentTarget.value,
                    })
                }
                fullWidth
            />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}
            >
                <RemoveElement
                    data_rm={sectionElements}
                    experimentId={sectionElements.experiment}
                    removeFunction={removeRequestSection}
                    setTabActive={props.setTabActive}
                />
            </div>

            {/* Quiz section elements */}
            {sectionElements.type === ETypeSection.QUIZ && (
                // <>
                //     <Grid container spacing={1} alignItems="flex-end">
                //         <Grid item>
                //             <TimerIcon />
                //         </Grid>
                //         <Grid item>
                //             <TextField
                //                 id="input-with-icon-grid"
                //                 label="Tiempo de Evaluación"
                //                 value={sectionElements.quizTime}
                //                 type="number"
                //                 size="small"
                //                 onChange={(e) =>
                //                     setSectionElements({
                //                         ...sectionElements,
                //                         quizTime: parseInt(
                //                             e.currentTarget.value,
                //                             10
                //                         ),
                //                     })
                //                 }
                //             />
                //         </Grid>
                //     </Grid>
                // </>
                <FormControl>
                    <InputLabel htmlFor="formatted-text-mask-input">
                        Tiempo (mm/ss)
                    </InputLabel>
                    <Input
                        value={parseTime(sectionElements.quizTime as number)}
                        onChange={(e) =>
                            changeTime(parseInverse(e.target.value))
                        }
                        name="textmask"
                        id="formatted-text-mask-input"
                        inputComponent={TextMaskCustom as any}
                    />
                </FormControl>
            )}

            {!objectEquals(sectionElements, props.section) && (
                <SaveChanges<ISection, EActionSections>
                    change={modifyRequestSection}
                    data={sectionElements}
                    experimentId={sectionElements.experiment}
                />
            )}
        </div>
    );
}
