import { useState, useCallback } from "react";
import { putPostDetail } from "../services/apis/postDetails";

export const usePostUpdate = () => {
  const [updating, setUpdating] = useState(false);

  const handleUpdate = useCallback(async (values = {}, id?: number) => {
    setUpdating(true);
    try {
      await putPostDetail(id, values);
      console.log("updated in hook", id, values);
      return;
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  }, []);

  return { handleUpdate, updating };
};
