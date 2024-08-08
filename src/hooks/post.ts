import { useCallback, useEffect, useState } from "react";
import { Post, PostFieldType } from "../types/post";
import {
  deletePost,
  getPostDetail,
  getPosts,
  postPost,
  putPostDetail,
} from "../services/apis/posts";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);

  const handleGetPosts = async (page: number) => {
    try {
      setLoadingPosts(true);
      const data = await getPosts(page);
      setPage(page);
      setPosts(data.posts);
      setTotalPosts(data.total);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    handleGetPosts(page);
  }, [page]);

  return {
    posts,
    handleGetPosts,
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

export const usePostDetail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPostDetail = async (id: number) => {
    try {
      setIsLoading(true);
      const data = await getPostDetail(id);
      console.log("get Post detail: ", data);
    } catch (err) {
      console.log(err, "getPostDetail error");
    } finally {
      setIsLoading(false);
    }
  };


  return {
    handleGetPostDetail,
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

export const usePostDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeletePost = async (id: number) => {
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
