import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm, Typography } from "antd";
import { Post } from "../../types/post";
import "./PostCard.css";
import { useState } from "react";
import { usePostDelete, usePostDetail } from "../../hooks/post";


interface PostCardProps {
  post: Post;
  currentPage: number;
  handleEditPost: (post: Post) => void;
  handleAfterSuccess: (page: number, isDeleted?: boolean) => void;
}

const { Paragraph } = Typography;

const PostCard: React.FC<PostCardProps> = (props) => {
  const { post, currentPage, handleEditPost, handleAfterSuccess } = props;
  const [expanded, setExpanded] = useState(false);

  const { isLoading, isDeleted , handleDeletePost } = usePostDelete();

  const { handleGetPostDetail } = usePostDetail();

  const handleEditPostDetail = async () => {
    await handleGetPostDetail(post.id);
    console.log(post);
    handleEditPost(post);
  }

  const handleConfirmDelete = async () => {
    await handleDeletePost(post.id);
    handleAfterSuccess(currentPage, isDeleted);
  };

  return (
    <Card
      className="post-card"
      title={`[${post.id}] ${post.title}`}
      actions={[
        <EditOutlined key="edit" onClick={handleEditPostDetail} />,
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
