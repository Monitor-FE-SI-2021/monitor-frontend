import react from 'react';
import {act, renderHook} from '@testing-library/react-hooks';
import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import Table from '../../../../components/LogsOverview/components/Table';
import React, { useMemo, useState, useEffect } from "react";

describe("ConsoleLogs", () => {
    it("Da li ima user neko", () => {

        const {result} = renderHook(() => useMemo(
            () => [
              {
                Header: "Console Logs",
                columns: [
                  {
                    Header: "User name",
                    accessor: "user_name"
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
          ));

        //console.log()

        render(
            <Table columns={result.all[0]} data={[{user_name: "Neki", command: "cd", response: " ", date_time: "neko"},
                                                  {user_name: "Neki1", command: "cd", response: " ", date_time: "neko1"} ]}/>
        );
      //screen.debug();
      
      expect(screen.getByText('Neki'));
    });

    it("Da li ima komanda cd", () => {

        const {result} = renderHook(() => useMemo(
            () => [
              {
                Header: "Console Logs",
                columns: [
                  {
                    Header: "User name",
                    accessor: "user_name"
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
          ));

        //console.log()

        render(
            <Table columns={result.all[0]} data={[{user_name: "Neki", command: "cd", response: " ", date_time: "neko"},
                                                  {user_name: "Neki1", command: "cd", response: " ", date_time: "neko1"} ]}/>
        );
      //screen.debug();
      
      expect(screen.getAllByText('cd'));
    });
});