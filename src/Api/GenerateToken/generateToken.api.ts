import { queueHttp } from "../@factories/http";
import apiSpecifications from "../@constants/apiSpecifications";
import apiFactory from "../@factories/api.factory";
import type { RequestToken } from "../@factories/request";

export default apiFactory({
  async generateToken(requestData: RequestToken) {
    try {
      const response = await queueHttp.post(
        apiSpecifications.generateToken.key,
        requestData
      );
      return response;
    } catch (error) {
      console.error("Failed to generate token:", error);
      throw error;
    }
  },
});