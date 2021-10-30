import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'; 
import { Redirect } from 'react-router-dom';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: props.userInfo, logoutStatus: false};
    this.userLogout = this.userLogout.bind(this);
  }

  userLogout() {
    fetch('http://18.116.30.191/JustAsk/logout',
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'Success') {
        this.setState({ logoutStatus: true });
      }
    })
  }

  render() {
      if (this.state.logoutStatus) {
        return (
          <Redirect to="/login"/> 
        );
      };
      return (
      <div class="div1">
        <div>
          <p className="title">
              JustAsk
          </p>
        </div>
        {this.state.userInfo !== false &&
          <div class="div2">
            <Avatar 
              icon={<UserOutlined style={{ fontSize: '20px' }}/>}
              className="avatar"
            />           
            <p className="welcomeInfo">
              {this.state.userInfo.firstname} {this.state.userInfo.lastname}
            </p>
            <Button type="primary" icon={<LogoutOutlined />} className="logout-button" onClick={this.userLogout}>
              Logout
            </Button>
          </div>
        }
      </div>
    )
  };
}

export default AppHeader;