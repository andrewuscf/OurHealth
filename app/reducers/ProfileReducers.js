'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
};

export default function AppReducers(state = initialState, action = null) {
    switch (action.type) {
        // case constants.UPDATE_PROFILE:
        //     return {
        //         ...state,
        //         Route: action.route
        //     };

        default:
            return state
    }
}