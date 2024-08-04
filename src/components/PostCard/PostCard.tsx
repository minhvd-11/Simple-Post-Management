import React, { useState } from "react";
import { Card, Typography } from "antd";
import { Post } from "../../types/post";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import { usePostDetails } from "../../hooks/postDetail";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const { post } = props;
  const { postTitle, postDescription } = usePostDetails(post.id);
  const [rows] = useState(5);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="card"
      title={`[${post.id}] ${postTitle}`}
      actions={[
        <EditButton key="edit" postId={post.id} />,
        <DeleteButton key="delete" postId={post.id}/>,
      ]}
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
        {postDescription}
      </Typography.Paragraph>
    </Card>
  );
};

export default PostCard;
