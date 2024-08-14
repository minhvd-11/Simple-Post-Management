import {
  GetPostsResponse,
  Post,
  PostFieldType,
  PostQuery,
} from "../../types/post";
import axios from "axios";

const BASE_API_ENDPOINT = "https://training-program.dev.tekoapis.net/api/v1";

export const getPosts = async (query: PostQuery): Promise<GetPostsResponse> => {
  const response = await axios.get(`${BASE_API_ENDPOINT}/posts`, {
    params: query,
  });
  return response.data;
};

export const postPost = async (postData: PostFieldType): Promise<Post> => {
  const response = await axios.post(`${BASE_API_ENDPOINT}/posts`, postData);
  return response.data;
};

export const getPostDetail = async (id: number): Promise<Post> => {
  const response = await axios.get(`${BASE_API_ENDPOINT}/posts/${id}`);
  return response.data;
};

export const deletePost = async (id: number): Promise<string> => {
  const response = await axios.delete(`${BASE_API_ENDPOINT}/posts/${id}`);
  console.log(`deleted data in post number:`, id);
  return response.data;
};

export const putPost = async (id: number, postData: PostFieldType): Promise<Post> => {
  const response = await axios.put(
    `${BASE_API_ENDPOINT}/posts/${id}`,
    postData
  );
  return response.data;
};
