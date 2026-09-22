import generateTokenActionTypes from '../actionTypes/generateToken.ActionType';

const initialState = {
    generateToken: [],
    waitingTokens: [],
};

export const generateTokenReducer = (state = initialState, action: any) => {
    console.log("[Redux] Reducer action:", action.type, action.payload);

    switch (action.type) {
        case generateTokenActionTypes.GET_TOKEN:
            return {
                ...state,
                generateToken: action.payload
            };
        case generateTokenActionTypes.GET_WAITING_TOKENS:
            const nextState = {
                ...state,
                waitingTokens: action.payload,
            };
            console.log("[Redux] Updated waitingTokens state:", nextState.waitingTokens);
            return nextState;
        default:
            return state;
    }
};