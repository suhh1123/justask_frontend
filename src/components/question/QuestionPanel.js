import React from 'react';
import { PageHeader, Tag, Typography, List, Comment, Input, Button, message, Space } from 'antd';
import { Redirect } from 'react-router-dom';

const { Paragraph } = Typography;
const { TextArea } = Input;

class QuestionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionDetails: props.questionDetails,
      userID: props.userID,
      userInfo: props.userInfo,
      answersList: [],
      answer: '',
      postStatus: false,
      isBackHome: false
    }
    this.getAnswers = this.getAnswers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.handleBackHome = this.handleBackHome.bind(this);
  }

  getAnswers() {
    let url = `http://18.116.30.191/JustAsk/fetch_answers?questionID=${this.state.questionDetails.questionID}`;

    fetch(url, 
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ answersList: data.map((answer) => {
          const date = new Date(answer.date);
          const Y = date.getFullYear() + '-';
          const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          const D = date.getDate();
          const time = Y + M + D;

          return {
            author: `${answer.user.firstname} ${answer.user.lastname}`,
            avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: `${answer.description}`,
            datetime: time
          }
        })
      });
      console.log(data);
    }).catch((error) => {
      console.error('error', error);
    })
  }

  componentDidMount = () => {
    this.getAnswers();
  }

  handleAnswerSubmit = () => {
    let url = `http://18.116.30.191/JustAsk/post_answer?userID=${this.state.userID}&questionID=${this.state.questionDetails.questionID}`
    const request = { sentence: this.state.answer }

    fetch(url, 
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
        this.setState({ postStatus: true, answer: '' });
        this.postSuccessInfo();
      } else {
        this.postFailInfo();
      }
    }).then(this.componentDidMount)
    .catch((error) => {
      console.error('error', error);
    })
  }

  handleChange = e => {
    this.setState({
      answer: e.target.value,
    });
  };

  handleBackHome = () => {
    this.setState({ isBackHome: true });
  }


  postSuccessInfo = () => {
    message.success('Answer Post Success');
  };
  
  postFailInfo = () => {
    message.error('Answer Post Fail');
  };

  render() {
    const questionDetails = this.state.questionDetails;
    const answersList = this.state.answersList;

    if (this.state.isBackHome) {
      return <Redirect to={
        {
          pathname: '/home',
          state: {
            username: this.state.userInfo.username,
            userID: this.state.userInfo.userID,
            firstname: this.state.userInfo.firstname,
            lastname: this.state.userInfo.lastname
          }
        }
      }/>   
    }
    return (
      <div>
        <PageHeader
          title={questionDetails.title}
          subTitle={questionDetails.description}
          tags={<Tag color="blue">Open to discuss</Tag>}
          extra={
            <p style={{color:'#8c8c8c', marginTop: 8 }}>{questionDetails.date}</p>
          }
          avatar={{ src: questionDetails.avatar }} 
          style={{ 
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16
          }}
        >
          <Paragraph style={{ position: 'relative', left: '20px', display: 'left' }}>
            {questionDetails.content}
          </Paragraph>
          <div>
            <TextArea 
            placeholder="Please put your answer in here"
            style={{ position: 'relative', left: '18px' }}
            autoSize={{ minRows: 3, maxRows: 6 }}
            onChange={this.handleChange}
            value={this.state.answer}
            />
            <Space style={{ float: 'right', marginTop: 12, position: 'relative', right: -17 }}>
              <Button 
              type="primary"
              onClick={this.handleAnswerSubmit}
              disabled={this.state.answer === ''}
              >
                Post Answer
              </Button>
              <Button
              type="link"
              onClick={this.handleBackHome}
              >
                Back To HomePage
              </Button>
            </Space>
          </div>
        </PageHeader>
        <List
          className="comment-list"
          header={'Answers'}
          itemLayout="horizontal"
          pagination={{
            pageSize: 5
          }}
          dataSource={answersList}
          renderItem={item => (
            <li style={{ margintTop: 12 }}>
              <Comment
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
          style={{ marginTop: 12, marginLeft: 60, marginRight: 20 }}
        >
        </List>
      </div>
    )
  }
}

export default QuestionPanel;