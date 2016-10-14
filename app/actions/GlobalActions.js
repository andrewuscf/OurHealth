'use strict';

import * as types from './ActionTypes';
import {fetchData, API_ENDPOINT, refreshPage} from './Utils';
import {AsyncStorage} from 'react-native';


export function setActiveRoute(routeName) {
    return {type: types.SET_ACTIVE_ROUTE, route: routeName}
}


export function setTokenInRedux(token, FromAPI = false) {
    if (FromAPI) {
        AsyncStorage.setItem('USER_TOKEN', token)
    }
    return {type: types.SET_TOKEN, token: token}
}

export function removeToken(token) {
    AsyncStorage.removeItem('USER_TOKEN');
    return {type: types.REMOVE_TOKEN}
}

export function login(email, pass) {
    const body = JSON.stringify({username: email, password: pass});

    return dispatch => {
        return fetch(`${API_ENDPOINT}auth/token/`, fetchData('POST', body))
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.token) {
                    return dispatch(setTokenInRedux(responseJson.token, true));
                } else {
                    return dispatch({type: types.API_ERROR, error: 'Incorrect Email or Password'});
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}


export function getUser(url = `${API_ENDPOINT}user/me/`, refresh = false) {
    return (dispatch, getState) => {
        if (refresh) {
            dispatch(refreshPage());
        }
        return fetch(url, fetchData('GET', null, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                return dispatch({type: types.LOAD_REQUEST_USER, request_user: responseJson});
            })
            .catch((error) => {
                console.log(error);
            });
    }
}


export function resetPassword(email) {
    return (dispatch, getState) => {
        const data = JSON.stringify({email: email});
        return fetch(`${API_ENDPOINT}auth/password/reset/`, fetchData('POST', data))
            .then((response) => response.json())
            .then((responseJson) => {
                return dispatch({type: types.REST_PASSWORD});
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function register(email, password, first_name, last_name) {
    return (dispatch, getState) => {
        const data = JSON.stringify({email: email, password: password, first_name: first_name, last_name: last_name});
        return fetch(`${API_ENDPOINT}auth/register/`, fetchData('POST', data))
            .then((response) => response.json())
            .then((responseJson) => {
                let message;
                if (responseJson.email) {
                    message = 'Verify your account email address';
                    if (responseJson.email.constructor === Array)
                        message = responseJson.email[0];
                }
                return dispatch({type: types.REGISTER_USER, message: message});
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
