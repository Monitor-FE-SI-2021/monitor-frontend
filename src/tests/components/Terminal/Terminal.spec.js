import react from 'react';
import {act, renderHook} from '@testing-library/react-hooks';
import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import { Terminal }  from '../../../components/Terminal/Terminal';
import HistoryLogs from '../../../components/Terminal/components/SavedLogs';
import MapConsoleOutput  from '../../../components/Terminal/components/MapConsoleOutput';

describe("MapConsoleOutput", () => {
    it("Invalid command", () => {
        
       const neki1={path: "neki", deviceUid: 1, name: "ime", deviceId: 2, location: "", ip: ""}
       const neki2={email: "", userId: 1}
       
       //console.log(props.machine.path + "1");

        render(
            <Terminal machine={neki1} user={neki2}/>
        );

      //screen.debug();
      
      expect(screen.getByText('Retrieving commands from the last session...'));
    });
      
});