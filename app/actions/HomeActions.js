'use strict';

import * as types from './ActionTypes';
import {fetchData, API_ENDPOINT, refreshPage} from './Utils';


export function getWorkRequests(position, refresh = false) {
    let url = `${API_ENDPOINT}user/request/`;
    return (dispatch, getState) => {
        if (refresh) {
            dispatch(refreshPage());
        }
        return fetch(url, fetchData('GET', null, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                return dispatch({type: types.LOAD_WORK_REQUESTS, response: responseJson, refresh: refresh});
            })
            .catch((error) => {
                return dispatch({
                    type: types.API_ERROR, error: JSON.stringify({
                        title: 'Request could not be performed.',
                        text: 'Please try again later.'
                    })
                });
            });
    }
}