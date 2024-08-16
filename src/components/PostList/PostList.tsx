import { Button, List, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PostCard from "../PostCard";
import { usePosts } from "../../hooks/post";
import { useState } from "react";
import PostForm from "../PostForm";
import { notification } from "antd";

const PostList: React.FC = () => {
  const { posts, pagination, loadingPosts, handleGetPosts } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToEditId, setPostToEditId] = useState<number>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPostToEditId(undefined);
    setIsModalOpen(false);
  };

  const handleAfterSuccess = (isDeleted?: boolean) => {
    if (!isDeleted) closeModal();
    notification.success({
      message: "Success",
      description: isDeleted
        ? "Delete post successfully!"
        : postToEditId
        ? "Update new post successfully!"
        : "Add post successfully!",
    });

    let newQuery; // Default query (go to first page)

    // In case edit or delete, keep current query
    if (postToEditId || isDeleted) {
      newQuery = { page: pagination.current, pageSize: pagination.pageSize };
    }

    handleGetPosts(newQuery);
  };

  const handleEditPost = (id: number) => {
    setPostToEditId(id);
    showModal();
  };

  const handleChangePage = (page: number, pageSize: number) => {
    const newQuery = { page, pageSize };
    handleGetPosts(newQuery);
  };

  return (
    <>
      <Button
        className="btn-add"
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        data-testid="btn-add-new-post"
      >
        Add New Post
      </Button>
      <Modal
        title={postToEditId ? "Edit Post" : "Add New Post"}
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        width={800}
      >
        <PostForm
          postToEditId={postToEditId}
          handleAfterSuccess={handleAfterSuccess}
        />
      </Modal>
      <List
        pagination={{
          align: "center",
          onChange: handleChangePage,
          ...pagination,
        }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        loading={loadingPosts}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <PostCard
              handleAfterSuccess={handleAfterSuccess}
              handleEditPost={handleEditPost}
              post={post}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default PostList;
