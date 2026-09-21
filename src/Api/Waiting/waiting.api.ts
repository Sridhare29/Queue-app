import http from "axios";
import apiSpecifications from "../@constants/apiSpecifications";
import apiFactory from "../@factories/api.factory";

export type WaitingToken = {
  id: number;
  tokenNo: string;
  status: string;
  userName: string;
  positionInQueue: number;
  createdDate: string;
};

export default apiFactory({
  async getWaitingTokens() {
    try {
      const response = await http.get<WaitingToken[]>(
        apiSpecifications.waiting.key
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch waiting tokens:", error);
      throw error;
    }
  },
});