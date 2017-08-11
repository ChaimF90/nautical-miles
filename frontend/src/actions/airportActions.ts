import * as types from './types';
import { Action } from '../interfaces';
import { Airport } from '../../../types';
import { getAirports } from './ajaxHelper';

function getFromAirportsSuccess(airports: Array<Airport>): Action<Airport> {
    return {
        type: types.GET_FROM_AIRPORTS_SUCCESS,
        payload: airports
    };
}

function getToAirportsSuccess(airports: Array<Airport>): Action<Airport> {
    return {
        type: types.GET_TO_AIRPORTS_SUCCESS,
        payload: airports
    };
}

function clearFromAirports() {
    return {
        type: types.CLEAR_FROM_AIRPORTS,
        payload: []
    };
}

function clearToAirports() {
    return {
        type: types.CLEAR_TO_AIRPORTS,
        payload: []
    };
}

function getFromAirports(query: string) {
    return async (dispatch: any) => {
        let response = await getAirports(query);
        dispatch(getFromAirportsSuccess(response.data));
    };
}

function getToAirports(query: string) {
    return async (dispatch: any) => {
        let response = await getAirports(query);
        dispatch(getToAirportsSuccess(response.data));
    };
}

export {
    getFromAirports,
    getToAirports,
    clearFromAirports,
    clearToAirports
};
