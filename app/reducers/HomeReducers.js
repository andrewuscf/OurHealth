'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
    WorkRequests: [],
    WorkRequestsNext: null,
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

        case constants.LOAD_WORK_REQUESTS:
            return {
                ...state,
                WorkRequests: (action.refresh) ? action.response.results :state.WorkRequests.concat(action.response.results),
                WorkRequestsNext: action.response.next,
                Refreshing: false
            };

        case constants.INVITE_WORKER:
            return {
                ...state,
                WorkRequests: state.WorkRequests.map(request =>
                    (request.id === action.work_request) ?
                    {
                        ...request,
                        notified: [
                            ...request.notified,
                            action.worker
                        ]
                    } :
                        request
                ),
            };


        default:
            return state
    }
}