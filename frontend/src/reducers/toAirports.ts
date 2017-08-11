import * as types from '../actions/types';
import { Action } from '../interfaces';
import { Airport } from '../../../types';

export default function toAirports(state: Array<Airport> = [], action: Action<Array<Airport>>) {
    switch (action.type) {
        case types.GET_TO_AIRPORTS_SUCCESS:
            return action.payload;
        case types.CLEAR_TO_AIRPORTS:
            return action.payload;
        default:
            return state;
    }
}