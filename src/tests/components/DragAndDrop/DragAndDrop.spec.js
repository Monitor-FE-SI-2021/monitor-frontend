import { render, screen, waitForElement } from '@testing-library/react';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import DragAndDrop from '../../../components/DragAndDrop/DragAndDrop';
import store from '../../../store/store';
import {act, renderHook} from '@testing-library/react-hooks';


test("renders without crashing", async () => {
    const { getByText } = render(
        <Provider store={store}>
            <DragAndDrop></DragAndDrop>
        </Provider>
    );
    const description = await waitForElement(() => getByText("Drag 'n' drop some files here, or click to select files"), {timeout: 2000});
    expect(description.textContent).not.toBeNull();
});
