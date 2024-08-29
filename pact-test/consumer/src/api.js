import axios from 'axios';

const API_HOST = process.env.API_HOST || 'http://127.0.0.1:9999';

export const getUser = (id) => {
  return axios.get(`${API_HOST}/users/${id}`).then(res => res.data);
};
