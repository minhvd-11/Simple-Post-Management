import axios from "./customize-axios";

export const getPostDetail = async (id = {}) => {
    const response = await axios.get(`api/v1/posts/${id}`);
    return response.data;
}

export const putPostDetail = async (id = {}, postData = {}) => {
    const response = await axios.put(`api/v1/posts/${id}`, postData
    );
    return response.data;
  }