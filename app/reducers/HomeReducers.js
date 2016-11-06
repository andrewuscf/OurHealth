'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
    WorkRequests: [],
    Refreshing: false
};

export default function AppReducers(state = initialState, action = null) {
    switch (action.type) {
        case constants.REFRESHING:
            return {
                ...state,
                Refreshing: true
            };
        
        case constants.ADD_WORK_REQUEST:
            return {
                ...state,
                WorkRequests: state.WorkRequests.concat(action.work_request),
                Refreshing: false
            };


        default:
            return state
    }
}