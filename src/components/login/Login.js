import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../../common/AppHeader';
import AppFooter from '../../common/AppFooter';
import LoginForm from './LoginForm';

const { Header, Footer, Content } = Layout;

function Login() {
  return (
    <Layout className="common_layout">
      <Header>
        <AppHeader
          userInfo={false}
        />
      </Header>
      <Content>
        <LoginForm/>
      </Content>
      <Footer>
        <AppFooter/>
      </Footer>
    </Layout>
  );
}

export default Login;