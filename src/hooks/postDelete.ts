import { useState } from "react";
import { deletePost } from "../services/apis/post";

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