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

const apiSpecifications: IApiSpecifications = {
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
