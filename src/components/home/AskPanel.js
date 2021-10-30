import React from 'react';
import { message, Form, Button, Input } from 'antd';

const { TextArea } = Input;

class AskPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      submitting: false,
      value: '',
      postStatus: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = () => {
    let url = `http://18.116.30.191/JustAsk/post_question?userID=${this.props.userInfo.userID}`;
    const request = { description: this.state.value }

    this.setState({
      submitting: true,
    });

    fetch( url, 
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'Success') {
        this.setState({ postStatus: true });
        this.postSuccessInfo();
      } else {
        this.postFailInfo();
      }
      this.setState({
        submitting: false,
        value: ""
      });
    })
    .catch((error) => {
      console.error('error', error);
    })
  };

  postSuccessInfo = () => {
    message.success('Question Post Success');
  };
  
  postFailInfo = () => {
    message.error('Question Post Fail');
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Form>
        <Form.Item>
          <TextArea 
          rows={7} 
          onChange={this.handleChange} 
          value={this.state.value} 
          style={{
            marginTop: 16,
          }}
          />
        </Form.Item>
        <Form.Item>
          <Button 
          htmlType="submit" 
          loading={this.state.submitting} 
          onClick={this.handleSubmit} 
          type="primary"
          style={{
            float: 'right'
          }}
          disabled={this.state.value === ''}
          >
            Post Your Question
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AskPanel;