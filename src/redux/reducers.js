import { FIND_FALCONE_SUCCESS, FIND_FALCONE_FAILURE, GET_ERROR } from "./actionTypes";

const initialState = {
    planetFound: '',
    errorMessage: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FIND_FALCONE_SUCCESS:
            const { winningPlanet } = action.payload;
            return {
                ...state,
                planetFound: winningPlanet
            };

        case FIND_FALCONE_FAILURE:
            return {
                ...state,
                planetFound: ''
            };

        case GET_ERROR:
            const { message } = action.payload;
            return {
                ...state,
                errorMessage: message
            };

        default:
            return {...state}
    }
};