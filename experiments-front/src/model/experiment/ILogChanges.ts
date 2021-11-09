export type ModificationType = 'SHORT_CHANGES' | 'IMPORTANT_CHANGES';

export interface ILogChanges {
    id: string;
    name: string;
    endDate?: Date | string;
    typeChanges: ModificationType;
    creationDate?: string;
    experiment: string;
}
