import { services } from "../../Api";
import generateTokenActionTypes from "../actionTypes/generateToken.ActionType";

export const getWaitingTokens = () => async (dispatch: any) => {
  try {
    const response = await services.waitingApi.getWaitingTokens();
    dispatch({
      type: generateTokenActionTypes.GET_WAITING_TOKENS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};