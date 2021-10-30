import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../../common/AppHeader';
import AppFooter from '../../common/AppFooter';
import QuestionPanel from './QuestionPanel';

const { Header, Footer, Content } = Layout;

class Question extends React.Component {   
    render() {
      return (
        <Layout className="common_layout">
          <Header>
            <AppHeader
              userInfo={this.props.location.state}
            />
          </Header>
          <Content>
            <QuestionPanel 
              questionDetails={this.props.location.state.questionDetails}
              userID={this.props.location.state.userID}
              userInfo={this.props.location.state}
            />
          </Content>
          <Footer className="homeFooter">
            <AppFooter/>
          </Footer>
        </Layout>      
      )
    }
}

export default Question;