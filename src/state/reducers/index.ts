import { combineReducers } from '@reduxjs/toolkit';
import { generateTokenReducer } from './generateToken.reducer';

const rootReducer = combineReducers({
    generateToken: generateTokenReducer
});

export default rootReducer;
