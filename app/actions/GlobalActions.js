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
                }
                if (responseJson.non_field_errors) {
                    return dispatch({
                        type: types.API_ERROR, error: JSON.stringify({
                            title: 'Incorrect Email or Password',
                            text: 'Please Try Again'
                        })
                    });
                }
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
            .then((response) => {
                if (response.status == 204) {
                    return dispatch({
                        type: types.API_ERROR, error: JSON.stringify({
                            title: 'Reset password sent',
                            text: 'Please check your email for the reset password link'
                        })
                    });
                } else {
                    return dispatch({
                        type: types.API_ERROR, error: JSON.stringify({
                            title: 'Request could not be performed.',
                            text: 'Please try again later.'
                        })
                    });
                }
            })
    }
}

export function register(data) {
    return (dispatch, getState) => {
        let JSONDATA = JSON.stringify(data);
        return fetch(`${API_ENDPOINT}auth/register/`, fetchData('POST', JSONDATA))
            .then((response) => response.json())
            .then((responseJson) => {
                let message;
                if (responseJson.email) {
                    message = {
                        title: 'Email verification required',
                        text: 'Please check your email in order to verify your account'
                    };
                    if (responseJson.email.constructor === Array)
                        message = {
                            title: responseJson.email[0],
                            text: 'Please use another email or log into your account.'
                        };
                }
                return dispatch({type: types.REGISTER_USER, message: JSON.stringify(message)});
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

export function createRequest(data) {
    return (dispatch, getState) => {
        var location = getState().Global.Location;
        let JSONDATA = JSON.stringify({
            ...data,
            lat: location.latitude,
            long: location.longitude
        });
        return fetch(`${API_ENDPOINT}user/request/`, fetchData('POST', JSONDATA, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                // return dispatch({type: types.REGISTER_USER, message: JSON.stringify(message)});
            })
            .catch((error) => {
                console.log(error)
                // return dispatch({
                //     type: types.API_ERROR, error: JSON.stringify({
                //         title: 'Request could not be performed.',
                //         text: 'Please try again later.'
                //     })
                // });
            });
    }
}

export function clearAPIError() {
    return {type: types.CLEAR_API_ERROR}
}

export function updateLocation(location) {
    return {type: types.UPDATE_LOCATION, location: location}
}