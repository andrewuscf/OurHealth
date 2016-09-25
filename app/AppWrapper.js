'use strict';

import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import rootReducer from './reducers/GlobalReducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);


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
