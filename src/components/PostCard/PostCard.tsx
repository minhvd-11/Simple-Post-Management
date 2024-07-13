import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';


interface PostCardProps {
    id: number
    title: string
    description: string
}

const PostCard: React.FC<PostCardProps> = (props) => (
  <Space direction="vertical" size={16}>
    <Card title={`[${props.id}] ${props.title}`} style={{ width: 300 }} actions={
        [<EditOutlined key="edit"/>,
        <DeleteOutlined key="delete" />,
        ]
    }>
    {props.description}
    </Card>
  </Space>
);

export default PostCard;