import react from 'react';
import {act, renderHook} from '@testing-library/react-hooks';
import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import HistoryLogs from '../../../../components/Terminal/components/SavedLogs';

describe("MapConsoleOutput", () => {
    it("Invalid command", () => {
        
        render(
            <HistoryLogs
            />
        );
      //screen.debug();
      
      expect(screen.getByText('Retrieving commands from the last session...'));
    });
});