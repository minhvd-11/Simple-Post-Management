import React, { useEffect } from "react";
import { Button, Form, Input, Spin, notification } from "antd";
import { usePostDetails } from "../../hooks/postDetail";
import { usePostUpdate } from "../../hooks/postUpdate";
import { usePostAdd } from "../../hooks/postAdd"; // Import the custom hook

type NotificationType = 'success'

const { TextArea } = Input;

interface PostFormProps {
  id?: number;
  mode: "create" | "edit";
  onSubmit: () => void;
}

const PostForm: React.FC<PostFormProps> = (props) => {
  const [form] = Form.useForm();
  const { mode, id, onSubmit } = props;
  const { handleSubmit, submitting } = usePostAdd(); // Use the custom hook

  let postTitle, postDescription, handleUpdate, updating;
  if (mode === "edit") {
    ({ postTitle, postDescription } = usePostDetails(id));
    ({ handleUpdate, updating } = usePostUpdate());
  }

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType) => {
    api[type]({
      message: 'Success',
      description: mode == 'edit' ?
      'Update post successfully!' : 'Add post successfully',
    });
  };

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
        if (mode === "create") {
          handleSubmit(values).finally(() => { onSubmit(); openNotification('success'); });
        } else {
          handleUpdate(values, id).finally(() => { onSubmit(); openNotification('success'); });
        }
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
      {contextHolder}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={mode === "create" ? submitting : updating}
        >
          Submit
        </Button>
        {(mode === "create" ? submitting : updating) && <Spin />}
      </Form.Item>
    </Form>
  );
};

export default PostForm;