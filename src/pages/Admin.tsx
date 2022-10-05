import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="warning"
    title="Unauthorize"
    subTitle="Sorry, the page you can't be accessed without permission."
    style={{ background: 'white', height: '100vh', borderTopLeftRadius: 20 }}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default NoFoundPage;
