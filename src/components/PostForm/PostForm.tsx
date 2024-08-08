import { Button, Form, FormProps, Input, Spin } from "antd";
import { Post, PostFieldType } from "../../types/post";
import { useEffect } from "react";
import { usePostAdd, usePostUpdate } from "../../hooks/post";

interface PostFormProps {
  currentPage: number;
  handleAfterSuccess: (page: number) => void;
  postToEditData?: Post;
}

const PostForm: React.FC<PostFormProps> = (props) => {
  const [form] = Form.useForm();
  const { currentPage, postToEditData, handleAfterSuccess } = props;

  const { handleSubmit, uploading } = usePostAdd();
  const { handleUpdate, updating } = usePostUpdate();
  //TODO:Spinner

  useEffect(() => {
    if (postToEditData) {
      const formInitialValues = {
        title: postToEditData.title,
        description: postToEditData.description,
      };
      form.setFieldsValue(formInitialValues);
    }
  }, [form, postToEditData]);

  const handleConfirmUpsert: FormProps<PostFieldType>["onFinish"] = async (
    values
  ) => {
    if (postToEditData) {
      await handleUpdate(postToEditData.id, values);
      console.log("Update post with values:", values);
    } else {
      await handleSubmit(values);
      console.log("Create a new post with values:", values);
    }

    handleAfterSuccess(postToEditData ? currentPage : 1);
  };

  return (
    <Spin spinning={postToEditData? updating : uploading}>
    <Form
      form={form}
      name="post-form"
      layout="vertical"
      onFinish={handleConfirmUpsert}
      autoComplete="off"
    >
      <Form.Item<PostFieldType>
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Please input the title!",
          },
          { max: 100, message: "The maximum length of title is 100!" },
        ]}
      >
        <Input placeholder="Enter title" data-testid="input-title" />
      </Form.Item>

      <Form.Item<PostFieldType>
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Please input the description!",
          },
        ]}
      >
        <Input.TextArea
          placeholder="Enter description"
          autoSize={{ minRows: 4 }}
          data-testid="input-description"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          data-testid="btn-submit-post-form"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Spin>
  );
};

export default PostForm;
