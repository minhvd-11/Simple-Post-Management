import React from 'react';
import { Button, Form, Input } from 'antd';

const PostForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form
      layout='vertical'
      form={form}
      style={{ maxWidth: 800 }}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input placeholder="Enter title" />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true }]}>
        <Input placeholder="Enter description" />
      </Form.Item>
      <Form.Item >
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;