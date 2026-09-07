import generateTokenActionTypes from '../actionTypes/generateToken.ActionType';

const initialState = {
    generateToken: [],
};

export const generateTokenReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case generateTokenActionTypes.GET_TOKEN:
            return {
                ...state,
                generateToken: action.payload
            };
        default:
            return state;
    }
};