import axios from 'axios';
import { GET_ERROR, FETCH_PLANETS, FETCH_SPACESHIPS, FETCH_TOKEN, UPDATE_SPACESHIP_COUNT, FIND_FALCONE } from "./actionTypes";
import { API_URL } from '../resources/apiList';

const getError = (message, history) => {
    history.push("/error");
    return {
        type: GET_ERROR,
        payload: {message}
    };
};

export const fetchToken = (history) => dispatch => {
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.post(API_URL + '/token')
        .then(res => {
            dispatch({
                type: FETCH_TOKEN,
                payload: res.data.token
            })
        })
        .catch(err => getError(err.message, history));
};

export const fetchPlanets = (history) => dispatch => {
    axios.get(API_URL + '/planets')
        .then(res => {
            /**
             * {"name":"Donlon","distance":100}
             */
            var planets = res.data.map(response => {
                return {
                    value: response.name,
                    label: response.name,
                    distance: response.distance
                };
            });
            dispatch({
                type: FETCH_PLANETS,
                payload: planets
            })
        })
        .catch(err => getError(err.message, history));
};

export const fetchSpaceships = (history) => dispatch => {
    axios.get(API_URL + '/vehicles')
        .then(res => {
            /*
                {"name":"Space pod","total_no":2,"max_distance":200,"speed":2}
            */
            dispatch({
                type: FETCH_SPACESHIPS,
                payload: res.data
            })
        })
        .catch(err => getError(err.message, history));
};

export const findFalcone = (requestObj, history) => dispatch => {
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.post(API_URL + '/find', requestObj)
        .then(res => {
            const redirectionPath = res.data.status === "success" ? '/found' : '/notFound';
            history.push(redirectionPath);
            dispatch({
                type: FIND_FALCONE,
                payload: res.data.planet_name
            })
        })
        .catch(err => getError(err.message, history));
};

export const updateSpaceshipCount = (currentSpaceship, previousSpaceship) => {
    const vehicles = {
        current: currentSpaceship,
        previous: previousSpaceship
    };
    return {
        type: UPDATE_SPACESHIP_COUNT,
        payload: vehicles
    };
};
