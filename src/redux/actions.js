import { GET_ERROR, FIND_FALCONE_SUCCESS, FIND_FALCONE_FAILURE } from "./actionTypes";

export const findFalconeSuccess = (winningPlanet, history) => {
    history.push('/found')
    return {
        type: FIND_FALCONE_SUCCESS,
        payload: {winningPlanet}
    };
};

export const findFalconeFailure = (history) => {
    history.push('/notFound');
    return {
        type: FIND_FALCONE_FAILURE,
        payload: null
    };
};

export const getError = (message, history) => {
    history.push("/error");
    return {
        type: GET_ERROR,
        payload: {message}
    };
};