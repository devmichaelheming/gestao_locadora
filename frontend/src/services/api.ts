import axios from 'axios';

const api = axios.create({
  baseURL: 'http://gestao-locadora.herokuapp.com/api/v1',
});

export default api;
