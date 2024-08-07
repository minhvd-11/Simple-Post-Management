import axios from "axios";

const instance = axios.create({
    baseURL: 'https://training-program.dev.tekoapis.net/api/v1',
    timeout: 1000,
  });

export default instance;