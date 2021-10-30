import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from "antd";
import { Redirect } from 'react-router-dom';
import { UserOutlined,  LockOutlined} from '@ant-design/icons';

function LoginForm() {
    const [userInfo, setUserInfo] = useState({
      loginStatus: false,
    });

    const onFinish = (loginInfo) => {
      const request = {username: loginInfo.username, password: loginInfo.password};
      
      fetch('http://18.116.30.191/JustAsk/login', 
      {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        mode: 'cors',
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'Success') {
          setUserInfo({
            loginStatus: true,
            username: request.username,
            password: request.password,
            userID: data.userId,
            firstname: data.firstname,
            lastname: data.lastname
          })
        } else {
          error();
        }
      })
      .catch((error) => {
        console.error('error', error)
      })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const error = () => {
      message.error('The password and username you entered are incorrect!');
    };

    if (userInfo.loginStatus === true) {
      return <Redirect to={
        {
          pathname: '/home',
          state: {
            username: userInfo.username,
            userID: userInfo.userID,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname
          }
        }
      }/>
    } 
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password" 
          />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-register" href="/register">
                Register Now!
            </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
};

export default LoginForm;