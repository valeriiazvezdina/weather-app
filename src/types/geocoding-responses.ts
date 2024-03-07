interface ICityLocationResponse extends ICityLocationData {
    local_names: {
        [key: string]: string;
    };
    state: string;
    country: string;
}

interface ICityLocationData {
    city: string;
    lat: number;
    lon: number;
}