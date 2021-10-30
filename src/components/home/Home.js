import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../../common/AppHeader';
import AppFooter from '../../common/AppFooter';
import HomePanel from './HomePanel';

const { Header, Footer, Content } = Layout;

function Home(props) {
  return (
    <Layout className="common_layout">
      <Header>
        <AppHeader
            userInfo={props.location.state}
        />
      </Header>
      <Content>
          <HomePanel
            userInfo={props.location.state}
            className='homePanel'
          />
      </Content>
      <Footer className="homeFooter">
          <AppFooter/>
      </Footer>
    </Layout>
  )
}

export default Home;