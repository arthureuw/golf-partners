import API from './api'
// const strapiUrl = process.env.STRAPI_URL;

export async function Login({ email, password }) {
  const res = await API.post(`auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}

export async function register({ email, password }) {
  const res = await API.post(`auth/local/register`, {
    identifier: email,
    password,
  });
  return res.data;
}
