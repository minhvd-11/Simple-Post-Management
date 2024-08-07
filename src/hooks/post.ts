import { useCallback, useEffect, useState } from "react";
import { Post, PostFieldType } from "../types/post";
import {
  deletePost,
  getPostDetail,
  getPosts,
  postPost,
  putPostDetail,
} from "../services/apis/posts";

export const usePosts = (page: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const handleGetPosts = async () => {
      try {
        setLoadingPosts(true);
        const data = await getPosts(page);
        setPosts(data.posts);
        setTotalPosts(data.total);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingPosts(false);
      }
    };

    handleGetPosts();
  }, [page]);

  return {
    posts,
    loadingPosts,
    page,
    totalPosts,
  };
};

export const usePostAdd = () => {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = useCallback(async (values: PostFieldType) => {
    setUploading(true);
    try {
      const response = await postPost(values);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }, []);

  return { handleSubmit, uploading };
};

export const usePostDetails = (id: number) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const handleGetPostDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getPostDetail(id);
        console.log("get Post detail: ", data);
        setPostTitle(data.title);
        setPostDescription(data.description);
      } catch (err) {
        console.log(err, "getPostDetail error");
      } finally {
        setIsLoading(false);
      }
    };
    handleGetPostDetails();

  return {
    postTitle,
    postDescription,
    id,
    isLoading,
  };
};

export const usePostUpdate = () => {
  const [updating, setUpdating] = useState(false);

  const handleUpdate = useCallback(
    async (id: number, values: PostFieldType) => {
      setUpdating(true);
      try {
        await putPostDetail(id, values);
        console.log("updated in hook", id, values);
        return;
      } catch (error) {
        console.error(error, "Update error");
      } finally {
        setUpdating(false);
      }
    },
    []
  );

  return { handleUpdate, updating };
};

export const usePostDelete = (id: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeletePost = async () => {
    try {
      setIsLoading(true);
      await deletePost(id);
      setIsDeleted(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isDeleted,
    handleDeletePost,
  };
};