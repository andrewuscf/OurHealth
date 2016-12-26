'use strict';

import * as types from './ActionTypes';
import {fetchData, API_ENDPOINT, refreshPage} from './Utils';


export function getChatRooms(refresh = false) {
    let url = `${API_ENDPOINT}chat/`;
    return (dispatch, getState) => {
        if (refresh) {
            dispatch(refreshPage());
        }
        return fetch(url, fetchData('GET', null, getState().Global.UserToken))
            .then((response) => response.json())
            .then((responseJson) => {
                return dispatch({type: types.LOAD_ROOMS, response: responseJson, refresh: refresh});
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
//
// export function getChatRooms(refresh = false) {
//     let url = `${API_ENDPOINT}chat/`;
//     return (dispatch, getState) => {
//         if (refresh) {
//             dispatch(refreshPage());
//         }
//         return fetch(url, fetchData('GET', null, getState().Global.UserToken))
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 return dispatch({type: types.LOAD_ROOMS, response: responseJson, refresh: refresh});
//             })
//             .catch((error) => {
//                 return dispatch({
//                     type: types.API_ERROR, error: JSON.stringify({
//                         title: 'Request could not be performed.',
//                         text: 'Please try again later.'
//                     })
//                 });
//             });
//     }
// }