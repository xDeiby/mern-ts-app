// Components
import SectionManage from './SectionManage';
import SectionView from './SectionView';
import { ISection } from '../../../../model/experiment';

// Librarys
import * as React from 'react';

export interface ISectionProps {
    section: ISection;
    setTabActive: (tab: number) => void;
}

export function Section(props: ISectionProps) {
    const { section, setTabActive } = props;

    // States
    const [isEdit, setIsEdit] = React.useState<boolean>(false);

    // Component
    return isEdit ? (
        <SectionManage section={section} setTabActive={setTabActive} />
    ) : (
        <div onClick={() => setIsEdit(true)}>
            <SectionView section={section} />
        </div>
    );
}
