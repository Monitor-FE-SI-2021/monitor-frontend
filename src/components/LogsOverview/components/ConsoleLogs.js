import React, {useMemo, useEffect, useState} from 'react';
import "../ConsoleLogs.scss";
import Table from "./Table";

import request, { authEndpoint, forgotPassword, resetPassword, users, userSecurityQuestions, answerCheck } from "../../../service";

const endpoint = 'https://si-2021.167.99.244.168.nip.io/api';

async function retrieveLogsFromDatabase(user_id, deviceId) {
  var logs = [];
  //console.log("device id: "+deviceId)
  //console.log("user_id: "+user_id)

  var url = ""

  if(user_id == "all_users")
      url = `${endpoint}/user-command-logs/CommandLogsForDevice?deviceId=${deviceId}`
  else url = `${endpoint}/user-command-logs/CommandLogsForDeviceAndUser?deviceId=${deviceId}&userId=${user_id}`

  //console.log("saljem url "+url);
  return request(url)
          .then(r => {
              if (r.status === 200) {
                  r.data.data.forEach((log) => {
                    logs.push({user_id: log.userId, command: log.command, response: log.response, date_time: log.time})
                  });
                  return logs;
              }
          });
}

const ConsoleLogs = ({user_id, deviceId}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      (async () => {
        const result = await retrieveLogsFromDatabase(user_id, deviceId);
        setData(result);
      })();
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