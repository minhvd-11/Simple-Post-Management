import axios from "axios";

export const getPost = async () => {
    const response = await axios.get ('https://training-program.dev.tekoapis.net/api/v1/posts')
    return response.data;
}