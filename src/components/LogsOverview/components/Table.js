import React, {useState, useEffect} from 'react';
import { useTable, useFilters, useSortBy } from "react-table";
import "../ConsoleLogs.scss";

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter 
  } = useTable(
    {
        columns,
        data
    },
      useFilters,
      useSortBy
  );

  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  // const handleFilterChange = e => {
  //   const value = e.target.value || undefined;
  //   setFilter("user_id", value);
  //   setFilterInput(value);
  // };

  // filtrira po device id-u
  /*useEffect(() => {
        setFilter("device_id", 2);
    }, []);
*/


  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
    {/* <input className="searchBar" value={filterInput} onChange={handleFilterChange} placeholder={"Search by User ID"}/> */}

    <table className="customTable" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? "sort-desc"
                      : "sort-asc"
                    : ""
                }
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}