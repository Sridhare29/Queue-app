import apiSpecifications from "./@constants/apiSpecifications";
import  generateTokenapi  from "./GenerateToken/generateToken.api";
import waitingApi from "./Waiting/waiting.api";
import queueApi from "./Queue/queue.api";
export const services = {
    apiSpecifications,
    generateTokenapi,
    waitingApi,
    queueApi,
}