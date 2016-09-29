'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
    Workers: [],
    Clients: [],
};

export default function AppReducers(state = initialState, action = null) {
    switch (action.type) {
        case constants.SET_ACTIVE_ROUTE:
            return {
                ...state,
                Route: action.route
            };


        default:
            return state
    }
}