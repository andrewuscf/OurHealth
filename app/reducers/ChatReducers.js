'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
    Rooms: [],
    Refreshing: false,
    RoomsNext: null
};

export default function AppReducers(state = initialState, action = null) {
    switch (action.type) {
        case constants.LOAD_ROOMS:
            return {
                ...state,
                Rooms: (action.refresh) ? action.response.results :state.Rooms.concat(action.response.results),
                RoomsNext: action.response.next,
                Refreshing: action.refresh
            };

        default:
            return state
    }
}