'use strict';

import * as types from './ActionTypes';
import {fetchData, API_ENDPOINT, refreshPage} from './Utils';


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
        console.log(data);
        return fetch(`${API_ENDPOINT}job/`,
            fetchData('POST', JSONDATA, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
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
