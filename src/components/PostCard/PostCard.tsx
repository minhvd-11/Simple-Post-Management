import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm, PopconfirmProps, Typography } from "antd";
import { Post } from "../../types/post";
import "./PostCard.css";
import { useState } from "react";
import { deletePost } from "../../services/apis/posts";

interface PostCardProps {
  /**
  * The post data to be shown in card
  */
  post: Post;
  handleEditPost?: (id: number) => void;
  handleAfterSuccess?: (isDeleted?: boolean) => void;
}

const { Paragraph } = Typography;

/**
* UI component to render the post data inside a card
*/
const PostCard: React.FC<PostCardProps> = (props) => {
  const { post, handleEditPost = () => {}, handleAfterSuccess=()=> {} } = props;
  const [loadingDeletePost, setLoadingDeletePost] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);

  const handleConfirmDelete: PopconfirmProps["onConfirm"] = async () => {
    try {
      setLoadingDeletePost(true);
      await deletePost(post.id);
    } finally {
      setLoadingDeletePost(false);
    }

    handleAfterSuccess(true);
  };

  return (
    <Card
      data-testid="card-post"
      className="post-card"
      title={`[${post.id}] ${post.title}`}
      actions={[
        <EditOutlined
          data-testid="icon-edit-post"
          key="edit"
          onClick={() => handleEditPost(post.id)}
        />,
        <Popconfirm
          key="delete"
          title="Delete Post"
          description="Are you sure to delete this post?"
          onConfirm={handleConfirmDelete}
          okButtonProps={{ loading: loadingDeletePost,
            'data-testid': 'btn-confirm-delete-post',
           }}
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
