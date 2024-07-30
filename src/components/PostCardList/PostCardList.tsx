import React from "react";
import { List } from "antd";
import PostCard from "../PostCard/PostCard";
import { usePosts } from "../../hooks/post";

const PostCardList: React.FC = () => {
  const { posts, isLoading } = usePosts();

return (
  <List
    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      align: "center",
      pageSize: 12,
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
