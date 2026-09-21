import generateTokenActionTypes from '../actionTypes/generateToken.ActionType';

const initialState = {
    generateToken: [],
    waitingTokens: [],
};

export const generateTokenReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case generateTokenActionTypes.GET_TOKEN:
            return {
                ...state,
                generateToken: action.payload
            };
        case generateTokenActionTypes.GET_WAITING_TOKENS:
            return {
                ...state,
                waitingTokens: action.payload,
            };
        default:
            return state;
    }
};