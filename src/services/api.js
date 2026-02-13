import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const criarResponsavel = (data) => {
  return apiClient.post('/responsaveis', data);
};

export const criarEscola = (data) => {
  return apiClient.post('/escolas', data);
};
