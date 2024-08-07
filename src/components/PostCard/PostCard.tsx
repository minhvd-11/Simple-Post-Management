import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm, Typography } from "antd";
import { Post } from "../../types/post";
import "./PostCard.css";
import { useState } from "react";
import { deletePost } from "../../services/apis/posts";


interface PostCardProps {
  post: Post;
  handleEditPost: (post: Post) => void;
  handleAfterSuccess: (isDeleted?: boolean) => void;
}

const { Paragraph } = Typography;

const PostCard: React.FC<PostCardProps> = (props) => {
  const { post, handleEditPost, handleAfterSuccess } = props;
  const [expanded, setExpanded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeletePost = async (id: number) => {
    try {
      setIsLoading(true);
      await deletePost(id);
      setIsDeleted(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    setIsLoading(true);
    handleDeletePost(post.id);
    handleAfterSuccess(isDeleted);
  };

  return (
    <Card
      className="post-card"
      title={`[${post.id}] ${post.title}`}
      actions={[
        <EditOutlined key="edit" onClick={() => handleEditPost(post)} />,
        <Popconfirm
          key="delete"
          title="Delete Post"
          description="Are you sure to delete this post?"
          onConfirm={handleConfirmDelete}
          okButtonProps={{ loading: isLoading }}
          okText="Confirm"
          cancelText="Cancel"
        >
          <DeleteOutlined data-testid="icon-delete-post" />
        </Popconfirm>,
      ]}
    >
      <Paragraph
        ellipsis={{
          rows: 5,
          expandable: "collapsible",
          expanded,
          symbol: (expanded: boolean) => (expanded ? "Show less" : "Show more"),
          onExpand: (_, info) => setExpanded(info.expanded),
        }}
        className="post-description"
      >
        {post.description}
      </Paragraph>
    </Card>
  );
};

export default PostCard;
