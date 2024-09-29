import { Typography } from "antd";
import "./App.css";
import PostList from "./components/PostList";
import { BubbleChat } from 'flowise-embed-react'

const { Title } = Typography;

const App = () => {
  return (
    <>
      <Title>Post Management</Title>
      <PostList />
      <BubbleChat chatflowid="07fd5763-6559-4a45-95e5-c45e2defd80a" apiHost="http://localhost:3000" />
    </>
  );
};

export default App;
