'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
    RequestUser: null,
    UserToken: '',
    Route: null,
    Refreshing: false,
    Error: null
};

export default function AppReducers(state = initialState, action = null) {
    switch (action.type) {
        case constants.SET_ACTIVE_ROUTE:
            return {
                ...state,
                Route: action.route
            };
        
        case constants.SET_TOKEN:
            return {
                ...state,
                UserToken: action.token
            };

        case constants.REMOVE_TOKEN:
            return {
                ...state,
                UserToken: ''
            };
        
        case constants.LOAD_REQUEST_USER:
            return {
                ...state,
                RequestUser: action.request_user
            };

        case constants.REFRESHING:
            return {
                ...state,
                Refreshing: true
            };
        
        case constants.API_ERROR:
            return {
                ...state,
                Error: action.error
            };

        case constants.REGISTER_USER:
            return {
                ...state,
                Error: action.message
            };

        default:
            return state
    }
}