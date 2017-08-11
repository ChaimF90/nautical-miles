import { combineReducers } from 'redux';
import fromAirports from './fromAirports';
import toAirports from './toAirports';

const appreducer = combineReducers({
    fromAirports,
    toAirports
});

export default appreducer;