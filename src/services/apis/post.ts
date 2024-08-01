import axios from "./customize-axios";

export const getPost = async (options = {}) => {
  const response = await axios.get(`api/v1/posts?`, {
    params: {
        "page" : options,
        "pageSize" : 12,
    },
  });
  return response.data;
};
