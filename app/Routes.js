'use strict';
import _ from 'lodash';

import Calendar from './containers/Calendar';
import Home from './containers/Home';
import Messages from './containers/Messages';
import Profile from './containers/Profile';

var MAIN_ROUTES = [
    {component: Home, name: 'Home'},
    {component: Calendar, name: 'Calendar'},
    {component: Messages, name: 'Messages'},
    {component: Profile, name: 'Profile'},
];

export function getRoute(routeName, props = null) {
    const index = _.findIndex(MAIN_ROUTES, {name: routeName});
    return {
        component: MAIN_ROUTES[index].component, name: routeName, passProps: props
    }
}
