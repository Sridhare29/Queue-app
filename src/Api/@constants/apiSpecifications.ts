interface IApiSpec {
  key: string;
  method: 'GET' | 'POST' | 'PUT';
  version?: string;
}

interface IApiSpecifications {
  [name: string]: IApiSpec;
}

const isDevelopment = (import.meta as ImportMeta & { env: { DEV: boolean } }).env.DEV;

export const API_BASE_URL = isDevelopment ? '' : 'https://localhost:7173';

const apiSpecifications: IApiSpecifications = {
  generateToken: {
    key: `${API_BASE_URL}/api/Queue/generate`,
    method: 'POST',
  },
  callNext: {
    key: `${API_BASE_URL}/api/Queue/call-next/{tokenNo}`,
    method: 'POST',
  },
  complete: {
    key: `${API_BASE_URL}/api/Queue/complete/{tokenNo}`,
    method: 'PUT',
  },
  waiting: {
    key: `${API_BASE_URL}/api/Queue/waiting`,
    method: 'GET',
  },
  status: {
    key: `${API_BASE_URL}/api/Queue/status/{tokenNo}`,
    method: 'GET',
  },
};

export default apiSpecifications;
