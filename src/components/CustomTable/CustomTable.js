import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getDeepProp } from "../../utils/utils";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        backgroundColor: '#404040',
        color: 'white',
        fontWeight: 600,
        padding: '5px 20px'
    }
});

export function TableSlot({ slot, render }) {
    return <div></div>
}

export default function CustomTable({ data, fields, children }) {

    const classes = useStyles();

    const activeFields = (fields || []).filter(field => field.disabled !== undefined ? !field.disabled : true);

    const renderDataRowCell = (item, field, rowIndex) => {

        let renderedCell = null;

        if (field.slot) {
            const tableSlot = (Array.isArray(children) ? children : [children]).find(c => c?.props?.slot === field.slot);
            renderedCell = tableSlot?.props?.render(item);
        } else {
            renderedCell = field.accessor ? getDeepProp(item, field.accessor) : item[field.name];
        }

        return (
            <TableCell component="th"
                       align={field.align}
                       scope="row"
                       style={{ width: field.width || 'initial' }}
                       key={`${item.id}-${field.name}`}>
                {renderedCell}
            </TableCell>
        );
    }

    return (
        <TableContainer component={Paper} className={'custom-table'}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.header} key={'header-row'}>
                        {activeFields.map(field => (
                            <TableCell className={classes.header} key={field.name}
                                       align={field.align}
                                       style={{ width: field.width || 'initial' }}>
                                {field.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={row.id ?? rowIndex}>
                            {activeFields.map((field, index) => (
                                renderDataRowCell(row, field, index)
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}