import knex from './config';
import { Airport } from '../types';

function addAirport(airport: Airport) {
    return knex('airports').insert(airport);
}

async function getAirports(query: string) {
    let results = await knex('airports')
    .select().where('code', 'like', `%${query}%`)
    .orWhere('name', 'like', `%${query}%`)
    .orWhere('city', 'like', `%${query}%`);
    return results;
}

export {
    addAirport,
    getAirports
}