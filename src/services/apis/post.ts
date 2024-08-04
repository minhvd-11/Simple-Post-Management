import axios from "./customize-axios";

export const getPost = async (page = 1) => {
  const response = await axios.get(`api/v1/posts`, {
    params: {
        "page" : page,
        "pageSize" : 12,
    },
  });
  return response.data;
};

export const postPost = async (postData: unknown) => {
  const response = await axios.post(`api/v1/posts`, postData);
  return response.data;
}

export const deletePost = async (id: number) => {
  const response = await axios.delete(`api/v1/posts/${id}`);
  console.log(`deleted data in post number:`, id )
  return response.data;
}
