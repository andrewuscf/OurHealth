'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
    Workers: [],
    Clients: [],
    WorkersNext: null
};

export default function AppReducers(state = initialState, action = null) {
    switch (action.type) {
        case constants.LOAD_WORKERS:
            return {
                ...state,
                Workers: state.Workers.concat(action.response.results),
                WorkersNext: action.response.next
            };


        default:
            return state
    }
}