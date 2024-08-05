import React, { useState, useContext } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import PostForm from "../PostForm";
import { PostContext } from "../Context/MyContext";

const EditButton: React.FC = () => {
  const { id, onUpdate } = useContext(PostContext);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    onUpdate();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <EditOutlined onClick={showModal} />
      <Modal
        title="Edit post"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer
        width={800}
      >
        <PostForm id={id} mode="edit" onSubmit={handleOk} />
      </Modal>
    </>
  );
};

export default EditButton;
