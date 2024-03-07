'use client'

import Navbar from '@/components/navbar';
import { useQuery } from 'react-query'
import axios from 'axios';
import {State} from "@/state/state";

// TODO: add dotenv for api key

export default function Home() {
    // geocoding request
    // TODO: add comparing parameters with State object
    // TODO: add transform function to remove local_names property from response
    const { isLoading, error, data } = useQuery<ICityLocationResponse>(
        'repoData',
        async () => {
            const {data} = await axios.get(`
            http://api.openweathermap.org/geo/1.0/direct?q=Prague&limit=1&appid=a82b4fc4d0ebc4dc534098f393674b6d
            `);

            return data;
        }
    );

    if (isLoading) {
        return 'Loading...'
    }

    if (error) {
        return `An error has occurred: ${error}`
    }

    // assigning to State
    State.push()

    console.log(data);

    // TODO: forecast request
    // TODO: add comparing parameters with State object
    // TODO: add transform function to remove unnecessary properties from response

    return (
        <div
            className="flex flex-col gap-4 bg-gray-100 min-h-screen">
            <Navbar />
        </div>
    );
}

function transformWeatherResponse(data: ICityLocationResponse[]): ICityLocationData {
    const [ cityData ] = data;
    return {
        city: cityData.city,
        lat: cityData.lat,
        lon: cityData.lon
    }
}


// 1. receive the name of the city
// 2. save it in the hash state object
// 3. geocode it into latitude and longitude
// 4. save it in the hash state object
// 5. send the request to open-weather
