import axios from 'axios';

function getAirports(query: string) {
    const params = {
        query
    };
    return axios.get('/api/airports', { params });
}

export {
    getAirports
};