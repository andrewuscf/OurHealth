'use strict';

import * as types from './ActionTypes';
import {fetchData, API_ENDPOINT, refreshPage} from './Utils';
import {Platform} from 'react-native';


export function getWorkRequests(refresh = false) {
    let url = `${API_ENDPOINT}request/`;
    return (dispatch, getState) => {
        if (refresh) {
            dispatch(refreshPage());
        }
        return fetch(url, fetchData('GET', null, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
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

export function inviteWorker(workerId, workRequestId) {
    return (dispatch, getState) => {
        var data = {worker: workerId, work_request: workRequestId};
        let JSONDATA = JSON.stringify(data);
        return fetch(`${API_ENDPOINT}job/`,
            fetchData('POST', JSONDATA, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                return dispatch({type: types.INVITE_WORKER, ...data});
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

export function getJobs(refresh = false) {
    let url = `${API_ENDPOINT}job/`;
    return (dispatch, getState) => {
        if (refresh) {
            dispatch(refreshPage());
        }
        return fetch(url, fetchData('GET', null, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                return dispatch({type: types.LOAD_JOBS, response: responseJson, refresh: refresh});
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


export function acceptJob(jobId, data, asyncActions) {
    asyncActions(true);
    let url = `${API_ENDPOINT}job/${jobId}/`;
    return (dispatch, getState) => {
        return fetch(url, fetchData('PATCH', JSON.stringify(data), getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                asyncActions(false);
                return dispatch({type: types.ACCEPT_JOB, response: responseJson});
            })
            .catch((error) => {
                asyncActions(false);
                return dispatch({
                    type: types.API_ERROR, error: JSON.stringify({
                        title: 'Request could not be performed.',
                        text: 'Please try again later.'
                    })
                });
            });
    }
}

export function setDeviceForNotification(token) {
    return (dispatch, getState) => {
        const thisUser = getState().Global.RequestUser;
        let JSONData = {
            name: `${thisUser.first_name}-${thisUser.last_name}-${Platform.OS}`,
            registration_id: token,
            is_active: true,
            type: Platform.OS
        };
        const sendData = JSON.stringify(JSONData);
        return fetch(`${API_ENDPOINT}devices/`, fetchData('POST', sendData, getState().Global.UserToken))
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }
}

export function selectJob(job) {
    return {type: types.SELECTED_JOB, job: job};
}