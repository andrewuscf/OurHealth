'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
    Workers: [],
    Clients: [],
    WorkersNext: null,
    Refreshing: false
};

export default function AppReducers(state = initialState, action = null) {
    switch (action.type) {
        case constants.REFRESHING:
            return {
                ...state,
                Refreshing: true
            };

        case constants.LOAD_WORKERS:
            return {
                ...state,
                Workers: (action.refresh) ? action.response.results :state.Workers.concat(action.response.results),
                WorkersNext: action.response.next,
                Refreshing: false
            };


        default:
            return state
    }
}