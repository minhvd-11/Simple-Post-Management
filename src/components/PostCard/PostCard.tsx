import React, { useState } from "react";
import { Card, Typography } from "antd";
import { Post } from "../../types/post";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import { PostContext } from "../Context/MyContext";

interface PostCardProps {
  post: Post;
  onUpdate: () => void;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const { post, onUpdate } = props;
  const [rows] = useState(5);
  const [expanded, setExpanded] = useState(false);

  return (
    <PostContext.Provider value={{ id: post.id, onUpdate }}>
      <Card
        className="card"
        title={`[${post.id}] ${post.title}`}
        actions={[<EditButton key="edit" />, <DeleteButton key="delete" />]}
      >
        <Typography.Paragraph
          className="post-description"
          ellipsis={{
            rows,
            expandable: "collapsible",
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
            symbol: expanded ? "Show less" : "Show more",
          }}
        >
          {post.description}
        </Typography.Paragraph>
      </Card>
    </PostContext.Provider>
  );
};

export default PostCard;
