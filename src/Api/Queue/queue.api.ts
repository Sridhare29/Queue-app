import http from "axios";
import apiSpecifications from "../@constants/apiSpecifications";
import apiFactory from "../@factories/api.factory";

const tokenEndpoint = (template: string, tokenNo: string) =>
  template.replace("{tokenNo}", encodeURIComponent(tokenNo));

export default apiFactory({
  async callNext(tokenNo: string, counterId: number) {
    return http.post(
      tokenEndpoint(apiSpecifications.callNext.key, tokenNo),
      { counterId }
    );
  },

  async complete(tokenNo: string) {
    return http.put(
      tokenEndpoint(apiSpecifications.complete.key, tokenNo),
    );
  },
});