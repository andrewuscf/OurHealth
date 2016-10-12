'use strict';

import React from 'react';
import {combineReducers} from 'redux';


import Global from './GlobalReducers';
import Home from './HomeReducers';
import Profile from './ProfileReducers';

export default combineReducers({
    Global,
    Home,
    Profile
});

