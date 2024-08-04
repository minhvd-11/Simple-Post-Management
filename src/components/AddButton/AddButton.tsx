import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import PostForm from "../PostForm";

const AddButton: React.FC = () => {
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
      <Button
        className="btn-add"
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Add New Post
      </Button>
      <Modal
        title="Add New Post"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer
        width={800}
      >
        <PostForm mode="create" onSubmit={handleOk}/>
      </Modal>
    </>
  );
};

export default AddButton;
