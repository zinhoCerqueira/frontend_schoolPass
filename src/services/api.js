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

export const login = async (email, senha) => {
  try {
    const response = await apiClient.post('/auth/login', { email, senha });
    if (response.data.access_token && response.data.perfil) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('perfil', response.data.perfil);
      localStorage.setItem('nome', response.data.nome);
      localStorage.setItem('sobrenome', response.data.sobrenome);
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
