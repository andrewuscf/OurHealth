'use strict';

import React from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';

import Global from './reducers/GlobalReducers';
import Home from './reducers/HomeReducers';
import Profile from './reducers/ProfileReducers';

const reducers = combineReducers({
    Global,
    Home,
    Profile
});


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);


const AppWrapper = React.createClass({
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
});

export default AppWrapper;
