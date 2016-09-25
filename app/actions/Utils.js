'use strict';

export const API_ENDPOINT = 'http://localhost:8000/api/v1/';


export function fetchData(method, body = null, token = null, headers = null) {
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

    return data;
}