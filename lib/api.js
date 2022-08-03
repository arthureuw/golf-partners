import axios from 'axios';

export default axios.create({
  baseURL: `https://golf-partners.herokuapp.com/api/`,
  timeout: 1000,
  headers: {
    // Authorization: `Bearer ${API_TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});
