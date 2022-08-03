import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:1337/api/`,
  timeout: 1000,
  headers: {
    // Authorization: `Bearer ${API_TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});
