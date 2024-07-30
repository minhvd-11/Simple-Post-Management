import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface TitleProps {
    title: string
}

const App: React.FC<TitleProps> = (props) => (
  <>
    <Title>
        {props.title}
    </Title>
  </>
);

export default App;