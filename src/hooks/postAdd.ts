import { useState, useCallback } from "react";
import { postPost } from "../services/apis/post";

export const usePostAdd = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (values = {}) => {
      setSubmitting(true);
      try {
          const response = await postPost(values);
          return response.data;
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  return { handleSubmit, submitting };
};
