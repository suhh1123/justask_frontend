import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../../common/AppHeader';
import AppFooter from '../../common/AppFooter';
import RegisterForm from './RegisterForm';

const { Header, Footer, Content} = Layout

function Register() {
  return (
    <Layout className="common_layout">
      <Header>
        <AppHeader
          userInfo={false}
        />
      </Header>
      <Content>
        <RegisterForm/>
      </Content>
      <Footer>
        <AppFooter/>
      </Footer>
    </Layout>
  );
}

export default Register;