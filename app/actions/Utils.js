'use strict';

export const SITE = 'http://caretent-staging.us-west-2.elasticbeanstalk.com/';

export const API_ENDPOINT = `${SITE}api/v1/`;

import {REFRESHING} from './ActionTypes';


export function fetchData(method, body = null, token = null, headers = null, getData = null) {
    let data = {
        method: method,
        headers: headers ? headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        data.headers['Authorization'] = `Token ${token}`;
    }

    if (body) {
        data = Object.assign(data, {body: body});
    }

    if (getData) {
        data = Object.assign(data, {data: getData});
    }

    return data;
}

export function refreshPage() {
    return {type: REFRESHING}
}