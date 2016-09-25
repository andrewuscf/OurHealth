'use strict';

import _ from 'lodash';

var MAIN_ROUTES = [
    
];

export function getRoute(routeName) {
    const index = _.findIndex(MAIN_ROUTES, {name: routeName});
    return MAIN_ROUTES[index];
}
