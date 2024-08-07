import { GetPostsResponse, PostFieldType } from "../../types/post";
import axios from "./customize-axios";

export const getPosts = async (page: number): Promise<GetPostsResponse> => {
  const response = await axios.get(`/posts`, {
    params: {
        "page" : page,
        "pageSize" : 12,
    },
  });
  return response.data;
};

export const postPost = async (postData: PostFieldType) => {
  const response = await axios.post(`/posts`, postData);
  return response.data;
}

export const getPostDetail = async (id:number): Promise<PostFieldType> => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
}

export const deletePost = async (id: number) => {
  const response = await axios.delete(`/posts/${id}`);
  console.log(`deleted data in post number:`, id )
  return response.data;
}


export const putPostDetail = async (id: number, postData: PostFieldType) => {
  const response = await axios.put(`/posts/${id}`, postData
  );
  return response.data;
}