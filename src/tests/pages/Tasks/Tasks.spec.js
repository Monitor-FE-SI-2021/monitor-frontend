import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import Tasks from "../../../pages/Tasks/Tasks.js";
import { Provider } from 'react-redux'
import store from '../../../store/store';

describe('Tasks tests', () => {
    it('renders usersTable', () => {
        const div = document.createElement("div");
        const component = renderer.create(<Provider store={store}>
                <Tasks/>
           </Provider>)
           let tree = component.toJSON();
        expect(tree.children[1].props.className).toBe("usersTable")
    })
})