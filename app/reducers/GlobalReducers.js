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
    Error: null,
    Location: null,
    SelectedJob: null
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
                UserToken: action.token,
                Error: null
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

        case constants.CLEAR_API_ERROR:
            return {
                ...state,
                Error: null
            };

        case constants.UPDATE_USER:
            return {
                ...state,
                RequestUser: action.request_user
            };

        case constants.UPDATE_PROFILE:
            return {
                ...state,
                RequestUser: {
                    ...state.RequestUser,
                    profile: action.profile
                }
            };

        case constants.UPDATE_LOCATION:
            return {
                ...state,
                Location: action.location
            };

        case constants.UPDATE_AVAILABILITY:
            let availability = state.RequestUser.profile.availability;
            action.remove.forEach((day)=> {
                let index = _.findLastIndex(availability, function(o) {
                    return o.start == day.start && o.end == day.end;
                });
                availability = availability.slice(0, index).concat(availability.slice(index + 1))
            });
            availability = [
                ...availability,
                ...action.add
            ];
            return {
                ...state,
                RequestUser: {
                    ...state.RequestUser,
                    profile: {
                        ...state.RequestUser.profile,
                        availability: availability
                    }
                }
            };

        case constants.SELECTED_JOB:
            return {
                ...state,
                SelectedJob: action.job
            };

        default:
            return state
    }
}