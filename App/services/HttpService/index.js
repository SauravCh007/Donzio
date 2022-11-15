import axios from 'axios';

export default {
  get: (url) => axios.get(url).then((res) => res),
  post: (url, data) => axios.post(url, data).then((res) => res),
  put: (url, data) => axios.put(url, JSON.stringify(data)).then((res) => res),
  patch: (url, data) =>
    axios.patch(url, JSON.stringify(data)).then((res) => res),
  delete: (url) => axios.delete(url).then((res) => res),
};
