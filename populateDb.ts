require('dotenv').config();
import { addAirport } from './repo/airports';
import * as fs from 'fs';
import { Airport } from './types';

function getAirportsJson() : Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile('./airports.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                return resolve(data);
            }
        })
    })
}


async function getData() {
    let jsonData = await getAirportsJson();
    let parsed = JSON.parse(jsonData);
    let airports = new Array<any>();
    Object.keys(parsed).forEach(key => {
        airports.push(parsed[key]);
    })
    airports = airports.filter(a => a.country === 'US' && a.iata);
    let promises = airports.map(a => {
        const airport: Airport = {
            name: a.name,
            code: a.iata,
            city: a.city,
            lat: a.lat,
            lon: a.lon
        };
        return addAirport(airport)
    })
    await Promise.all(promises);
    process.exit();
}

getData();