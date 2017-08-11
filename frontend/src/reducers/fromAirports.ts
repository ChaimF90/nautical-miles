import * as types from '../actions/types';
import { Action } from '../interfaces';
import { Airport } from '../../../types';

export default function fromAirports(state: Array<Airport> = [], action: Action<Array<Airport>>) {
    switch (action.type) {
        case types.GET_FROM_AIRPORTS_SUCCESS:
            return action.payload;
        case types.CLEAR_FROM_AIRPORTS:
            return action.payload;
        default:
            return state;
    }
}