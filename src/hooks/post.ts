import { useEffect, useState } from "react";
import { Post, PostFieldType, PostQuery } from "../types/post";
import {
  getPostDetail,
  getPosts,
  postPost,
  putPost,
} from "../services/apis/posts";
import { PaginationConfig } from "antd/es/pagination";

const defaultQuery = {
  page: 1,
  pageSize: 12,
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({});
  const [loadingPosts, setLoadingPosts] = useState(false);


  const handleGetPosts = async (query: PostQuery = defaultQuery) => {
    try {
      setLoadingPosts(true);
      const data = await getPosts(query);
      setPosts(data.posts);
      setPagination({
        current: query.page,
        pageSize: query.pageSize,
        total: data.total,
      });
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return {
    posts,
    pagination,
    loadingPosts,
    handleGetPosts,

  };
};

export const usePostDetail = (id?:number) => {
  const [postDetail, setPostDetail] = useState<Post>();
  const [loadingPostDetail, setLoadingPostDetail] = useState(false);

  const handleGetPostDetail = async (id: number) => {
    try {
      setLoadingPostDetail(true);
      const post = await getPostDetail(id);
      setPostDetail(post);
    } catch (err) {
      console.log(err, "getPostDetail error");
    } finally {
      setLoadingPostDetail(false);
    }
  };

  useEffect(() => {
    if(id) handleGetPostDetail(id);
  }, [id])

  return {
    postDetail,
    loadingPostDetail,
  };
};

export const useUpsertPost = () => {
  const [loadingUpsertPost, setLoadingUpsertPost] = useState(false);

  const handleCreatePost = async (data: PostFieldType) => {
    try {
      setLoadingUpsertPost(true);
      await postPost(data);
    } finally {
      setLoadingUpsertPost(false);
    }
  };

  const handleUpdatePost = async (id: number, data: PostFieldType) => {
    try {
      setLoadingUpsertPost(true);
      await putPost(id, data);
    } finally {
      setLoadingUpsertPost(false);
    }
  };

  return { loadingUpsertPost, handleCreatePost, handleUpdatePost };
};