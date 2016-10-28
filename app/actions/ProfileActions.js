'use strict';

import * as types from './ActionTypes';
import {fetchData, API_ENDPOINT, refreshPage} from './Utils';

export function updateUser(data) {
    const json_data = JSON.stringify(data);
    return (dispatch, getState) => {
        return fetch(`${API_ENDPOINT}user/${getState().Global.RequestUser.id}/`,
            fetchData('PATCH', json_data, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                return dispatch({type: types.UPDATE_USER, request_user: responseJson});
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

export function updateProfile(data, asyncActions) {
    asyncActions(true);
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    return (dispatch, getState) => {
        return fetch(`${API_ENDPOINT}user/profile/${getState().Global.RequestUser.id}/`,
            fetchData('PATCH', data, getState().Global.UserToken, headers))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                asyncActions(false);
                return dispatch({type: types.UPDATE_PROFILE, profile: responseJson});
            })
            .catch((error) => {
                asyncActions(false);
                console.log(error);
                return dispatch({
                    type: types.API_ERROR, error: JSON.stringify({
                        title: 'Request could not be performed.',
                        text: 'Please try again later.'
                    })
                });
            });
    }
}