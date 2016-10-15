'use strict';

import * as constants from '../actions/ActionTypes';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';



const initialState = {
    User: null,
};

export default function AppReducers(state = initialState, action = null) {
    switch (action.type) {
        case constants.LOAD_PROFILE:
            return {
                ...state,
                User: action.user
            };



        default:
            return state
    }
}