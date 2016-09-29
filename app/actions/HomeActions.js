'use strict';

import * as types from './ActionTypes';
import {fetchData, API_ENDPOINT} from './Utils';


export function loadWorkers(url = `${API_ENDPOINT}user/me/`, refresh = false) {
    var data = {
        'lat': position.coords.latitude,
        'lng': position.coords.longitude
    };
    return (dispatch, getState) => {
        if (refresh) {
            dispatch(refreshPage());
        }
        return fetch(url, fetchData('GET', null, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                return dispatch({type: types.LOAD_WORKERS, response: responseJson});
            })
            .catch((error) => {
                console.log(error);
            });
    }
}