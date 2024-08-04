import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, notification } from "antd";
import { usePostDelete } from "../../hooks/postDelete";
type NotificationType = 'success'

interface DeleteButtonProps {
  postId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const id = props.postId;
  const { isLoading, handleDeletePost } = usePostDelete(id);
  const [open, setOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType) => {
    api[type]({
      message: 'Success',
      description:
      'Delete post successfully!',
    });
  };

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    await handleDeletePost();
    setOpen(false);
    openNotification('success');
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Delete Post"
      description="Are you sure to delete this post?"
      okText="Confirm"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: isLoading }}
      onCancel={handleCancel}
    >
      {contextHolder}
      <DeleteOutlined type="primary" onClick={showPopconfirm} />
    </Popconfirm>
  );
}

export default DeleteButton;