import react from 'react';
import {act, renderHook} from '@testing-library/react-hooks';
import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import ConsoleLogs from '../../../../components/LogsOverview/components/ConsoleLogs';

describe("ConsoleLogs", () => {
    it("Da li ima user name", () => {
        
        render(
            <ConsoleLogs/>
        );
      //screen.debug();
      
      expect(screen.getByText('User name'));
    });

    it("Da li ima console logs", () => {
        
        render(
            <ConsoleLogs/>
        );
      //screen.debug();
      
      expect(screen.getByText('Console Logs'));
    });

    it("Da li ima command", () => {
        
        render(
            <ConsoleLogs/>
        );
      //screen.debug();
      
      expect(screen.getByText('Command'));
    });

    it("Da li ima response", () => {
        
        render(
            <ConsoleLogs/>
        );
      //screen.debug();
      
      expect(screen.getByText('Response'));
    });

    it("Da li ima date and time", () => {
        
        render(
            <ConsoleLogs/>
        );
      //screen.debug();
      
      expect(screen.getByText('Date and Time'));
    });
});