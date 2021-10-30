import React from 'react';
import { Layout, Menu } from 'antd';
import LatestPanel from './LatestPanel';
import { AppstoreOutlined, FireOutlined, SearchOutlined, CommentOutlined, DashboardOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import SearchPanel from './SearchPanel';
import AskPanel from './AskPanel';
import UserPanel from './UserPanel';
const { Content, Sider } = Layout; 

class HomePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentKey: "1" };
    this.menuSelect = this.menuSelect.bind(this);
  }

  menuSelect = (e) => {
    this.setState({
      currentKey: e.key
    })
  }

  render() {
    return (
      <Layout className="site-layout-background" style={{ padding: '50px 50px 50px 50px' }}>
        <Sider className="site-layout-backgroud" width={200}>
          <div className="logo" />
          <Menu
            mode="inline"
            onClick={this.menuSelect}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Menu">
              <Menu.Item key="1" icon={<FireOutlined />}>Latest</Menu.Item>
              <Menu.Item key="2" icon={<SearchOutlined />}>Search</Menu.Item>
              <Menu.Item key="3" icon={<CommentOutlined />}>Ask</Menu.Item>
              <Menu.Item key="4" icon={<DashboardOutlined />}>Dashborad</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '10px 24px', minHeight: 650 }}>
          {this.state.currentKey === '1' && <LatestPanel userInfo={this.props.userInfo}/>}
          {this.state.currentKey === '2' && <SearchPanel userInfo={this.props.userInfo}/>}
          {this.state.currentKey === '3' && <AskPanel userInfo={this.props.userInfo}/>}
          {this.state.currentKey === '4' && <UserPanel userInfo={this.props.userInfo}/>}
        </Content>
      </Layout>
    );
  };
}

export default HomePanel;