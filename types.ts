interface Airport {
    code: string;
    city: string;
    name: string;
    lat: number;
    lon: number;
}

interface AirportWithId extends Airport {
    id: number;
}

export {
    Airport, 
    AirportWithId
}