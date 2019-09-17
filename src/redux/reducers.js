import { GET_ERROR, FETCH_TOKEN, FETCH_PLANETS, FETCH_SPACESHIPS, UPDATE_SPACESHIP_COUNT, FIND_FALCONE } from "./actionTypes";

const initialState = {
    planets: [],
    spaceships : [],
    token: '',
    planetFound: '',
    errorMessage: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TOKEN:
            return {
                ...state,
                token: action.payload
            };

        case FETCH_PLANETS:
            return {
                ...state,
                planets: action.payload
            };
        
        case FETCH_SPACESHIPS:
            return {
                ...state,
                spaceships: action.payload
            };
    
        case FIND_FALCONE:
            return {
                ...state,
                planetFound: action.payload
            };

        case UPDATE_SPACESHIP_COUNT:
            const { current, previous } = action.payload;
            return {
                ...state,
                spaceships: state.spaceships.map(spaceship => {
                    if (spaceship.name === current) {
                        return {...spaceship, total_no: spaceship.total_no - 1};
                    } else if (spaceship.name === previous) {
                        return {...spaceship, total_no: spaceship.total_no + 1};
                    } else {
                        return {...spaceship};
                    }
                })
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