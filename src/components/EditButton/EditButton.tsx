import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import PostForm from "../PostForm";

interface EditButtonProps {
    postId: number;
}

const EditButton: React.FC<EditButtonProps> = (props) => {
    const id = props.postId;
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
    <>
    <EditOutlined onClick={showModal}/>
    <Modal
        title="Edit post"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer
        width={800}
      >
        <PostForm id = {id} mode="edit" onSubmit={handleCancel}/>
      </Modal>
      </>
  );
};

export default EditButton;
