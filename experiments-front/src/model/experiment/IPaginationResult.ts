import { IPage } from '.';

export interface IPaginationResult<T = any> {
    next: IPage;
    previous: IPage;
    data: T[];
    total: number;
}
