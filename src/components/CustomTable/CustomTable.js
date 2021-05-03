import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import DownArrow from '@material-ui/icons/ArrowDropDown';
import { getDeepProp } from "../../utils/utils";
import classnames from 'classnames';

import { Droppable, Draggable } from "react-beautiful-dnd"
import './custom_table.scss'
import { Spinner } from "../Spinner/Spinner";


export function TableSlot({ slot, render }) {
    return <div></div>
}

export default function CustomTable({
                                        data,
                                        fields,
                                        children,
                                        handleSort,
                                        activeSortField,
                                        activeSortOrder,
                                        async,
                                        hasDragAndDrop,
                                        droppableId,
                                    }) {

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

    const renderTableBody = () => {
        if (hasDragAndDrop) {
            return (
                <Droppable
                    droppableId={`${droppableId}`}>
                    {(provided, snapshot) => (
                        <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                            {data.map((row, rowIndex) => (
                                <Draggable
                                    draggableId={`${data[rowIndex].deviceUid}`}
                                    key={`${data[rowIndex].deviceUid}`}
                                    index={rowIndex}>
                                    {(provided, snapshot) => (
                                        <TableRow
                                            key={row.id ?? rowIndex}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                backgroundColor: snapshot.isDragging ? "white" : "inherit",
                                                ...provided.draggableProps.style
                                            }}>
                                            {activeFields.map((field, index) => (
                                                renderDataRowCell(row, field, index)
                                            ))}
                                        </TableRow>)}
                                </Draggable>))}
                            {provided.placeholder}
                        </TableBody>)}
                </Droppable>
            )
        } else {
            return (
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={row.id ?? rowIndex}>
                            {activeFields.map((field, index) => (
                                renderDataRowCell(row, field, index)
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            )
        }
    }

    const renderNoResultsMessage = () => {
        if (hasDragAndDrop) {
            return (
                <Droppable droppableId={`${droppableId}`}>
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='no-results-message'>
                            Nema rezultata.
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )
        } else {
            return (
                <div className='no-results-message'>
                    Nema rezultata.
                </div>
            )
        }
    }

    return (
        <TableContainer component={Paper} className={'custom-table-container'}>
            <Table stickyHeader className='custom-table'>
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
                                            <UpArrow
                                                data-testid="sortAscendingButton"
                                                className={'sort-icon'}
                                                style={{
                                                    color: (activeSortField === field.name && activeSortOrder === 'asc') && "#7c90ff"
                                                }}
                                                onClick={() => {
                                                    handleSort(field.name, "asc")
                                                }}/>
                                            <DownArrow
                                                className={'sort-icon'}
                                                style={{
                                                    color: (activeSortField === field.name && activeSortOrder === 'desc') && "#7c90ff"
                                                }}
                                                onClick={() => handleSort(field.name, "desc")}/>
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {(!async && data.length !== 0) && (
                    renderTableBody()
                )}
            </Table>
            {async ? <Spinner/> : data?.length !== 0 ? null : (
                renderNoResultsMessage()
            )}
        </TableContainer>
    );
}
