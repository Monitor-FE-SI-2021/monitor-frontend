import { Store } from '@material-ui/icons';
import React from 'react';
import renderer from 'react-test-renderer';
import {Tabs} from '../../../components/Tabs/Tabs'
import { Screenshot } from '../../../components/Tabs/Tabs'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import store from '../../../store/store';


test('GetScreenshot test', () => {
    const component = renderer.create(
        <Provider store={store}>
         <Screenshot/> 
        </Provider>
        ,
    );
    let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
console.log(tree.children[1].props)
  tree.children[1].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot()
});