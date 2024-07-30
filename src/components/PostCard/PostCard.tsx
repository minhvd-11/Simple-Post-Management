import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import { Post } from "../../types/post";

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const { post } = props;
  const [rows] = useState(5);
  const [expanded, setExpanded] = useState(false);
  return (
      <Card
        className="card"
        title={`[${post.id}] ${post.title}`}
        actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
      >
        <Typography.Paragraph
          ellipsis={{
            rows,
            expandable: "collapsible",
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
            symbol: "Show more",
          }}
        >
          {post.description}
        </Typography.Paragraph>
      </Card>
  );
};

export default PostCard;
