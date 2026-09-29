interface IApiSpec {
  key: string;
  version?: string;
}

interface IApiSpecifications {
  [name: string]: IApiSpec;
}

const isDevelopment = (import.meta as ImportMeta & { env: { DEV: boolean } }).env.DEV;

export const API_BASE_URL = isDevelopment ? '' : 'https://localhost:7173';
const QUEUE_API_URL = `${API_BASE_URL}/api/Queue`;
const AUTH_API_URL = `${API_BASE_URL}/api/Auth`;

const apiSpecifications: IApiSpecifications = {
  signup: {
    key: `${AUTH_API_URL}/signup`,
  },
  adminSignup: {
    key: `${AUTH_API_URL}/signup`,
  },
  login: {
    key: `${AUTH_API_URL}/login`,
  },
  generateToken: {
    key: `${QUEUE_API_URL}/generate`,
  },
  callNext: {
    key: `${QUEUE_API_URL}/call-next/{tokenNo}`,
  },
  complete: {
    key: `${QUEUE_API_URL}/complete/{tokenNo}`,
  },
  waiting: {
    key: `${QUEUE_API_URL}/waiting`,
  },
  status: {
    key: `${QUEUE_API_URL}/status/{tokenNo}`,
  },
};

export default apiSpecifications;
