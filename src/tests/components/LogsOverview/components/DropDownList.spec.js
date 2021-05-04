import react from 'react';
import {act, renderHook} from '@testing-library/react-hooks';
import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import DropDownList from '../../../../components/LogsOverview/components/DropDownList';

describe("ConsoleLogs", () => {
    it("Da li ima user name", () => {
        
        render(
            <DropDownList/>
        );
      //screen.debug();
      
      expect(screen.getByText('All users'));
    });
});