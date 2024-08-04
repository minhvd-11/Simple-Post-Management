// usePostFormSubmit.ts
import { useState, useCallback } from "react";
import { postPost } from "../services/apis/post";
import { putPostDetail } from "../services/apis/postDetails";

export const usePostFormSubmit = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (values = {}, mode: "create" | "edit", id?: number) => {
      setSubmitting(true);
      try {
        if (mode === "create") {
          const response = await postPost(values);
          return response.data;
        } else if (mode === "edit") {
          await putPostDetail(id, values);
          console.log('updated in hook', id, values)
          return;
        }
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
