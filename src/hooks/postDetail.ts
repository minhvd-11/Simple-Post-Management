import { useEffect, useState } from "react";
import { getPostDetail } from "../services/apis/postDetails";

export const usePostDetails = (id = {}) => {
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleGetPostDetails = async () => {
            try {
                setIsLoading(true);
                const data = await getPostDetail(id);
                setPostTitle(data.title);
                setPostDescription(data.description);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        handleGetPostDetails();
    }, [id]);

    return {
        postTitle,
        postDescription,
        id,
        isLoading,
    };
};
