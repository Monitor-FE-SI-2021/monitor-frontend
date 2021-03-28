import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import DownArrow from '@material-ui/icons/ArrowDropDown';
import FilterList from '@material-ui/icons/FilterList'
import { getDeepProp } from "../../utils/utils";
import { Checkbox, FormControl, Input, ListItemText, MenuItem, Select } from "@material-ui/core";
import classnames from 'classnames';

import './custom_table.scss'


export function TableSlot({ slot, render }) {
    return <div></div>
}

export default function CustomTable({ data, fields, children }) {

    const [tableData, setTableData] = useState(data);
    const [allData, setAllData] = useState(data);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState([]);


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSort = (columnName, sortDirection) => {

        let oldData = JSON.parse(JSON.stringify(tableData));

        if (sortDirection === 'asc') {
            if (columnName === 'name') {
                oldData.sort((a, b) => (a.name > b.name) ? 1 : -1)
            } else if (columnName === 'location') {
                oldData.sort((a, b) => (a.location > b.location) ? 1 : -1)
            }
        } else {
            if (columnName === 'name') {
                oldData.sort((a, b) => (a.name > b.name) ? -1 : 1)
            } else if (columnName === 'location') {
                oldData.sort((a, b) => (a.location > b.location) ? -1 : 1)
            }
        }
        setTableData(oldData);
    }

    useEffect(() => {
        if (filter.length !== 0) {
            let oldData = JSON.parse(JSON.stringify(allData));
            let newData = [];
            for (let data of oldData) {
                if (filter[0] === true && data.status === true) {
                    newData.push(data);
                } else if (filter[0] === false && data.status === false) {
                    newData.push(data);
                }
            }
            setTableData(newData);
        } else {
            setTableData(allData);
        }
    }, [filter]);


    const handleChange = (event) => {
        if (filter[0] === event.target.value) {
            setFilter([]);
        } else {
            setFilter([event.target.value]);
        }
    };

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
        <TableContainer component={Paper} className={'custom-table-container'}>
            <FilterList className='filter-btn' onClick={handleOpen}/>
            {open ?
                <FormControl style={{ float: 'right' }}>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={filter}
                        input={<Input/>}
                        onChange={handleChange}>
                        <MenuItem value="" disabled>
                            <em>Status</em>
                        </MenuItem>
                        <MenuItem value={true}>
                            <Checkbox checked={filter.indexOf(true) > -1}/>
                            <ListItemText primary="Active"/>
                        </MenuItem>
                        <MenuItem value={false}>
                            <Checkbox checked={filter.indexOf(false) > -1}/>
                            <ListItemText primary="Inactive"/>
                        </MenuItem>
                    </Select>
                </FormControl>
                : null}
            <Table className='custom-table'>
                <TableHead>
                    <TableRow className={'header-row'} key={'header-row'}>
                        {activeFields.map(field => (
                            <TableCell key={field.name}
                                       className='header-row-cell'
                                       align={field.align}
                                       style={{ width: field.width || 'initial' }}>
                                <div className={classnames('cell-content', [field.align])}>
                                    <span>{field.title}</span>
                                    {field.sort === true && (
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}>
                                            <UpArrow onClick={() => {
                                                handleSort(field.name, "asc")
                                            }}/>
                                            <DownArrow onClick={() => handleSort(field.name, "desc")}/>
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, rowIndex) => (
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
