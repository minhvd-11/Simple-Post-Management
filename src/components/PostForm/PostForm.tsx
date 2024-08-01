import React, { useState } from "react";
import { Button, Form, Input } from "antd";


const { TextArea } = Input;

const PostForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input placeholder="Enter title" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true }]}
      >
        <TextArea
          placeholder="Enter description"
          autoSize={{ minRows: 4 }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
