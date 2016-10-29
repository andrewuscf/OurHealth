'use strict';

import * as types from './ActionTypes';
import {fetchData, API_ENDPOINT, refreshPage} from './Utils';


export function loadWorkers(position, refresh = false) {
    let url = `${API_ENDPOINT}user/near/?lat=${position.latitude}&long=${position.longitude}`;
    return (dispatch, getState) => {
        if (refresh) {
            dispatch(refreshPage());
        }
        return fetch(url, fetchData('GET', null, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                return dispatch({type: types.LOAD_WORKERS, response: responseJson, refresh: refresh});
            })
            .catch((error) => {
                console.log(error);
            });
    }
}