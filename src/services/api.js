import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const criarResponsavel = async (data) => {
  try {
    const response = await apiClient.post('/responsaveis', data);
    const userData = response.data.responsavel;
    if (userData) {
      localStorage.setItem('access_token', 'mock_access_token_for_newly_created_user');
      localStorage.setItem('perfil', 'responsavel');
      localStorage.setItem('nome', userData.nome);
      localStorage.setItem('sobrenome', userData.sobrenome);
      localStorage.setItem('id_token', userData.id);
    }
    return response.data;
  } catch (error) {
    console.error('Guardian creation failed:', error);
    throw error;
  }
};

export const criarEscola = async (data) => {
  try {
    const response = await apiClient.post('/escolas', data);
    const userData = response.data.escola;
    if (userData) {
      localStorage.setItem('access_token', 'mock_access_token_for_newly_created_user');
      localStorage.setItem('perfil', 'escola');
      localStorage.setItem('nome', userData.nome);
      localStorage.setItem('sobrenome', userData.sobrenome);
      localStorage.setItem('id_token', userData.id);
    }
    return response.data;
  } catch (error) {
    console.error('School creation failed:', error);
    throw error;
  }
};

export const criarAluno = (data) => {
  return apiClient.post('/alunos', data);
};

export const getAlunos = (responsavelId) => {
  return apiClient.get(`/alunos?responsavel_id=${responsavelId}`);
};

export const getAluno = (id) => {
  return apiClient.get(`/alunos/${id}`);
};

export const updateAluno = (id, data) => {
  return apiClient.patch(`/alunos/${id}`, data);
};

export const deleteAluno = (id) => {
  return apiClient.delete(`/alunos/${id}`);
};

export const login = async (email, senha) => {
  try {
    const response = await apiClient.post('/auth/login', { email, senha });
    if (response.data.access_token && response.data.perfil) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('perfil', response.data.perfil);
      localStorage.setItem('nome', response.data.nome);
      localStorage.setItem('sobrenome', response.data.sobrenome);
      localStorage.setItem('id_token', response.data.id);
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
