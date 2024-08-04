import React, { useCallback, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Typography, Modal } from "antd";
import PostForm from "../PostForm";
import { Post } from "../../types/post";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const { post } = props;
  const [rows] = useState(5);
  const [expanded, setExpanded] = useState(false);

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Card
      className="card"
      title={`[${post.id}] ${post.title}`}
      actions={[<EditOutlined key="edit" onClick={showModal}/>, <DeleteOutlined key="delete" />]}
    >
      <Typography.Paragraph
        className="post-description"
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
      <Modal
        title="Add New Post"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer
        width={800}
      >
        <PostForm id = {post.id} mode="edit" onSubmit={handleCancel}/>
      </Modal>
    </Card>
  );
};

export default PostCard;
