import React, {useMemo, useEffect, useState} from 'react';
import "../ConsoleLogs.scss";
import Table from "./Table";


const API_HOST = "http://localhost:3000";
const INVENTORY_API_URL = `${API_HOST}/logs`;

const ConsoleLogs = () => {
    const [data, setData] = useState([]);

    const fetchInventory = () => {
        fetch(`${INVENTORY_API_URL}`)
            .then(res => res.json())
            .then(json => {
                setData(json);
            });
    }

    useEffect(() => {
        fetchInventory();
    }, []);


    const columns = useMemo(
    () => [
      {
        Header: "Console Logs",
        columns: [
          {
            Header: "User ID",
            accessor: "user_id"
          },
          /*{
            Header: "Device ID",
            accessor: "device_id"
          },*/
          {
            Header: "Command",
            accessor: "command",
            disableSortBy: true

          },
          {
            Header: "Response",
            accessor: "response",
            disableSortBy: true

          },
          {
            Header: "Date and Time",
            accessor: "date_time"
          }
        ]
      }
      
    ],
    []
  );

    return (
    <div className="ConsoleLogs">
      <Table columns={columns} data={data} />
    </div>
    );

}

export default ConsoleLogs;