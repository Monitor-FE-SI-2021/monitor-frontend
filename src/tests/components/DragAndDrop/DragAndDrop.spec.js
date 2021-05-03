import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import DragAndDrop from '../../../components/DragAndDrop/DragAndDrop';
import store from '../../../store/store';
import {act, renderHook} from '@testing-library/react-hooks';


test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Provider store={store}>
            <DragAndDrop></DragAndDrop>
        </Provider>, div
    );
});
