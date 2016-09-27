'use strict';
import _ from 'lodash';

import Calendar from './containers/Calendar';
import Messages from './containers/Messages';
import Profile from './containers/Profile';

var MAIN_ROUTES = [
    {component: Calendar, name: 'Calendar'},
    {component: Messages, name: 'Messages'},
    {component: Profile, name: 'Profile'},
];

export function getRoute(routeName) {
    const index = _.findIndex(MAIN_ROUTES, {name: routeName});
    return MAIN_ROUTES[index];
}
