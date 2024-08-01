import React, { useState } from "react";
import { List } from "antd";
import PostCard from "../PostCard/PostCard";
import { usePosts } from "../../hooks/post";

const PostCardList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { posts, totalPosts, isLoading } = usePosts(page);

return (
  <List
    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
    pagination={{
      onChange: (page) => {
        setPage(page);
        console.log('page number: ',page);
      },
      current: page,
      align: "center",
      pageSize: 12,
      total : totalPosts,
    }}
    loading={isLoading}
    dataSource={posts}
    renderItem={(post) => (
      <List.Item>
        <PostCard
          post = {post}
        />
      </List.Item>
    )}
  />
);
};

export default PostCardList;
