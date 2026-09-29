import http from "../@factories/http";
import apiSpecifications from "../@constants/apiSpecifications";
import apiFactory from "../@factories/api.factory";

export type SignupRequest = {
  name: string;
  mobileNumber: string;
  password: string;
};

export type LoginRequest = {
  mobileNumber: string;
  password: string;
};

export default apiFactory({
  async signup(requestData: SignupRequest) {
    return http.post(apiSpecifications.signup.key, requestData);
  },

  async adminSignup(requestData: SignupRequest) {
    return http.post(apiSpecifications.adminSignup.key, requestData);
  },

  async login(requestData: LoginRequest) {
    return http.post(apiSpecifications.login.key, requestData);
  },
});