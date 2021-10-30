import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

function RegisterForm() {
  const [registerStatus, setRegisterStatus] = useState(false);

  const onFinish = (registerInfo) => {
    const request = {
      username: registerInfo.username,
      password: registerInfo.password,
      firstname: registerInfo.firstname,
      lastname: registerInfo.lastname
    }

    fetch('http://18.116.30.191/JustAsk/registration', 
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
        setRegisterStatus(true);
      }
      if(data.status === 'Success') {
        registerSuccessInfo();
      } else {
        registerFailureInfo();
      }
    })
    .catch((error) => {
      console.error('error', error);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const registerSuccessInfo = () => {
    message.success('Registration Success');
  };

  const registerFailureInfo = () => {
    message.error('Registration Fail, username may already exist');
  }

  return (
    <Form
      name="normal_register"
      className="register-form"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 4 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Firstname"
        name="firstname"
        rules={[{ required: true, message: 'Please input your firstname' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Lastname"
        name="lastname"
        rules={[{ required: true, message: 'Please input your lastname' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 4}}>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button">
            Submit
          </Button>
          <a className="register-form-back-to-login" href="/login">
            Back to Login!
          </a>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;