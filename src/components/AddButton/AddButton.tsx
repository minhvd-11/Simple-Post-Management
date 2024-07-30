import React, { useState } from 'react';
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from 'antd';
import PostForm from '../PostForm';

const AddButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
  <>
    <Button className="btn-add" type="primary" icon={<PlusOutlined />} onClick={showModal}>
    Add New Post
    </Button>
    <Modal
        title="Add New Post"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer
      >
        <PostForm />
    </Modal>
  </>
  );
};

export default AddButton