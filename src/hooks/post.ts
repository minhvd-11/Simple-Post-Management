import { useEffect, useState } from "react";
import { getPost } from "../services/apis/post";
import { Post } from "../types/post";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleGetPosts = async () => {
            try {
                setIsLoading(true);
                const data = await getPost();
                setPosts(data.posts);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        handleGetPosts();
    }, []);

    return {
        posts, isLoading,
    };
}