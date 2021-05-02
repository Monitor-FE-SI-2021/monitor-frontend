import react from 'react';
import {act, renderHook} from '@testing-library/react-hooks';
import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import MapConsoleOutput from '../../../../components/Terminal/components/MapConsoleOutput';


describe("MapConsoleOutput", () => {
    it("Invalid command", () => {
        
        render(
            <MapConsoleOutput 
            name={""}
            location={""}
            ip={""}
            id={""}
            path={"nesta"}
            setPut={""}
            consoleOutput={['Invalid Command']}
            updateConsoleOutput={""}
            token={""}
            user={""}
            setTabCommands = {""}
            restartCommands = {""}
            setRestartCommands = {""}
            />
        );

        


      //screen.debug();
      
      expect(screen.getByText('Invalid Command'));
    });

    it("Valid", () => {
        
        render(
            <MapConsoleOutput 
            name={""}
            location={""}
            ip={""}
            id={""}
            path={"nesta"}
            setPut={""}
            consoleOutput={['cd nesto', 'ls']}
            updateConsoleOutput={""}
            token={""}
            user={""}
            setTabCommands = {""}
            restartCommands = {""}
            setRestartCommands = {""}
            />
        );

      //screen.debug();
      
      expect(screen.getByText('cd nesto'));
    });
      
});