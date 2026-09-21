import { services } from "../../Api";
import generateTokenActionTypes from "../actionTypes/generateToken.ActionType";
import type { RequestToken } from "../../Api/@factories/request";
import { getWaitingTokens } from "./waiting.Action";

export const getgenerateToken = (requestData: RequestToken) => async (dispatch: any) => {
        try{
            const response = await services.generateTokenapi.generateToken(requestData);
            dispatch({ type: generateTokenActionTypes.GET_TOKEN, payload: response.data });
            await dispatch(getWaitingTokens());
            return response.data;
        }
        catch (error) {
            console.error("Error generating token:", error);
            throw error;
        }
};