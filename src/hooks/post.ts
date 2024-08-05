import { useEffect, useState } from "react";
import { getPost } from "../services/apis/post";
import { Post } from "../types/post";

export const usePosts = (page:number, isUpdated: boolean) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        const handleGetPosts = async () => {
            try {
                setIsLoading(true);
                const data = await getPost(page);
                setTotalPosts(data.total);
                setPosts(data.posts);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        handleGetPosts();
    }, [page, isUpdated]);

    return {
        posts, totalPosts, page, isLoading, isUpdated
    };
}