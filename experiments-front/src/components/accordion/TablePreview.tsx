import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import * as React from 'react';
import api from '../../utils/api.config';
import Spinner from '../spinner';

export function TablePreview({ jsonModel }: { jsonModel: string }) {
    const [rows, setRows] = React.useState<string[]>([]);
    const [headers, setHeaders] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        const getMetadata = async () => {
            setLoading(true);
            try {
                const metadata = await api.post(
                    'answers/metadata',
                    JSON.parse(jsonModel)
                );

                const newData = {
                    row: [] as string[],
                    header: [] as string[],
                };

                for (const key in metadata.data) {
                    newData.header.push(key);
                    newData.row.push(metadata.data[key]);
                }

                setRows(newData.row);
                setHeaders(newData.header);

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        getMetadata();
    }, [jsonModel]);

    return loading ? (
        <Spinner />
    ) : (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {rows.map((row, index) => (
                            <TableCell key={index} align="left">
                                {row}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
