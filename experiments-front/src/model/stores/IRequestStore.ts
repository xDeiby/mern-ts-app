export interface IRequestStore<T>{
    data: T;
    loading: boolean;
    error: boolean;
}