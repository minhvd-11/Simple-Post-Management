import React, { useEffect } from "react";
import { Button, Form, Input, Spin } from "antd";
import { usePostDetails } from "../../hooks/postDetail";
import usePostFormSubmit from "../../hooks/postFormSubmit";

const { TextArea } = Input;

interface PostFormProps {
  id?: number;
  mode: "create" | "edit";
  onSubmit: () => void;
}

const PostForm: React.FC<PostFormProps> = (props) => {
  const [form] = Form.useForm();
  const { mode, id, onSubmit } = props;
  const { postTitle, postDescription } = usePostDetails(id);
  const { handleSubmit, submitting } = usePostFormSubmit();

  useEffect(() => {
    if (mode === "edit") {
      form.setFieldsValue({ title: postTitle, description: postDescription });
    }
  }, [form, postDescription, postTitle, id, mode]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={(values) => {
        handleSubmit(values, mode, id).finally(() => onSubmit());
      }}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input placeholder="Enter title" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true }]}
      >
        <TextArea placeholder="Enter description" autoSize={{ minRows: 4 }} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
        >
          Submit
        </Button>
        {submitting && <Spin />}
      </Form.Item>
    </Form>
  );
};

export default PostForm;
