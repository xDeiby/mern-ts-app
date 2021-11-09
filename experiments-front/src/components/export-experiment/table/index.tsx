/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from '@material-ui/data-grid';
import api from '../../../utils/api.config';
import DatePicker from '../../date-picker';
import { CustomSelect } from '../select/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { loadModels } from '../../../store/ducks/modelType';

export default function CustomizedTables() {
    // TODO: Pasarlo a redux
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const [filters, setFilters] = React.useState({
        initDate: '',
        endDate: '',
        model: '',
    });

    React.useEffect(() => {
        dispatch(loadModels());
    }, []);

    const getDynamicHeaders = (arr: any[]): string[] => {
        const keys: string[] = [];
        arr.forEach((exp) => {
            keys.push(...Object.keys(exp).filter((key) => !keys.includes(key)));
        });
        return keys;
    };

    const dispatch = useDispatch();
    const models = useSelector((store: ApplicationState) => store.modelTypes);

    const getHeaders = (arr: any[]) => {
        const staticKeys = [
            {
                field: 'user',
                headerName: 'Usuario',
                width: 200,
                type: 'string',
            },

            {
                field: 'email',
                headerName: 'Correo',
                width: 200,
                type: 'string',
                valueGetter: (e: any) => (e.value ? e.value : 'NA'),
            },
            {
                field: 'date',
                headerName: 'Fecha Creación',
                width: 200,
                type: 'date',
                valueGetter: (e: any) => new Date(e.value).toLocaleString(),
            },
        ];

        const dynamicKeys = getDynamicHeaders(arr);

        const headers = [
            ...staticKeys,
            ...dynamicKeys
                .filter(
                    (key) => !['id', 'date', 'group', 'email'].includes(key)
                )
                .map((key) => ({
                    field: key,
                    header: key,
                    width: 200,
                    type: 'string',
                })),
        ];

        return headers;
    };

    const getData = async (idModel: string): Promise<void> => {
        setLoading(true);

        try {
            const query = `model=${idModel}`;
            const result = await api.get(`answers?${query}`);
            getHeaders(result.data);
            setRows(result.data);
        } catch {}
        setLoading(false);
    };

    const changeFilters = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const dataFiltered = () => {
        const initDate = filters.initDate
            ? new Date(filters.initDate)
            : new Date('2020-05-03');
        const endDate = filters.endDate
            ? new Date(filters.endDate)
            : new Date();

        return rows
            ? rows.filter((answer: any) => {
                  const creationDate = new Date(answer.date);

                  return creationDate >= initDate && creationDate <= endDate;
              })
            : [];
    };

    return (
        <>
            {/* Filtros */}
            <div
                style={{
                    display: 'flex',
                    width: '60%',
                    margin: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    padding: '20px 0',
                    flexGrow: 1,
                }}
            >
                <DatePicker
                    label={'Fecha Inicio'}
                    value={filters.initDate}
                    name={'initDate'}
                    changeValue={changeFilters}
                />

                <CustomSelect
                    changeModel={(id: string) => {
                        setFilters((prev) => ({ ...prev, model: id }));
                        getData(id);
                        console.log('entre');
                    }}
                    model={filters.model}
                    options={models.data}
                />

                <DatePicker
                    label={'Fecha Termino'}
                    name={'endDate'}
                    value={filters.endDate}
                    changeValue={changeFilters}
                />
            </div>

            {/* Tabla */}
            <div style={{ height: 500, width: '80%', margin: 'auto' }}>
                <DataGrid
                    disableColumnMenu
                    disableSelectionOnClick
                    loading={loading}
                    rows={dataFiltered()}
                    columns={getHeaders(dataFiltered())}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    pagination
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
        </>
    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport csvOptions={{ allColumns: true }} />
        </GridToolbarContainer>
    );
}
