import { Button, List, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PostCard from "../PostCard";
import { usePostDetail, usePosts } from "../../hooks/post";
import { useState } from "react";
import PostForm from "../PostForm";
import { notification } from "antd";
import { Post } from "../../types/post";

const PostList: React.FC = () => {
  const { handleGetPosts, posts, loadingPosts, page, totalPosts } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToEditData, setPostToEditData] = useState<Post>();

  const { isLoading: isGettingPost, handleGetPostDetail } = usePostDetail();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPostToEditData(undefined);
    setIsModalOpen(false);
  };

  const handleAfterSuccess = async (page: number, isDeleted?: boolean) => {
    await handleGetPosts(page);
    if (!isDeleted) closeModal();
    notification.success({
      message: "Success",
      description: isDeleted
        ? "Delete post successfully!"
        : postToEditData
        ? "Add new post successfully!"
        : "Update post successfully!",
    });
  };

  const handleEditPost = (post: Post) => {
    handleGetPostDetail(post.id);
    setPostToEditData(post);
    showModal();
  };

  return (
    <>
      <Button
        className="btn-add"
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Add New Post
      </Button>
      <Spin spinning={isGettingPost}>
        <Modal
          title={postToEditData ? "Edit Post" : "Add New Post"}
          open={isModalOpen}
          footer={null}
          onCancel={closeModal}
          destroyOnClose={true}
          width={800}
        >
          <PostForm
            currentPage={page}
            postToEditData={postToEditData}
            handleAfterSuccess={handleAfterSuccess}
          />
        </Modal>
      </Spin>
      <Spin spinning={loadingPosts}>
        <List
          pagination={{
            onChange: (page) => handleGetPosts(page),
            current: page,
            align: "center",
            pageSize: 12,
            total: totalPosts,
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
                currentPage={page}
                handleAfterSuccess={handleAfterSuccess}
                handleEditPost={handleEditPost}
                post={post}
              />
            </List.Item>
          )}
        />
      </Spin>
    </>
  );
};

export default PostList;
