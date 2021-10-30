import React from 'react';
import { List, Avatar, Space, Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import { Redirect } from 'react-router';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

class LatestPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.userInfo, 
      questionsList: [],
      dates: [],
      isViewDetails: false,
      selectedQuestionDetails: {}
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.redirectToQuestionPanel = this.redirectToQuestionPanel.bind(this);
  }

  getQuestions = () => {
    fetch( 'http://18.116.30.191/JustAsk/latest',
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ questionsList: data.map((question) => {
          var keywords = 'Keywords: ';
          for (let i = 0; i < question.keywords.length; ++i) {
            keywords = keywords + `${question.keywords[i]}, `;
          }
          keywords = keywords.substr(0, keywords.length - 2);
          
          const date = new Date(question.date);
          const Y = date.getFullYear() + '-';
          const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          const D = date.getDate() + ' ';
          const h = date.getHours() + ':';
          const m = date.getMinutes() + ':';
          const s = date.getSeconds();
          const time = Y+M+D+h+m+s;

          return {
            questionID: question.id,
            title: `${question.user.firstname} ${question.user.lastname}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: keywords,
            content: `${question.description}`,
            date: time
          }
        })
      });
    })
    .catch((error) => {
      console.error('error', error);
    }) 
  }

  redirectToQuestionPanel(questionDetails) {
    this.setState({ 
      isViewDetails: true, 
      selectedQuestionDetails: questionDetails
    });
  }

  componentDidMount() {
    this.getQuestions();
  };

  render() {
    if (this.state.isViewDetails) {
      return (
        <Redirect to={
          {
            pathname: '/question',
            state: {
              username: this.state.userInfo.username,
              userID: this.state.userInfo.userID,
              firstname: this.state.userInfo.firstname,
              lastname: this.state.userInfo.lastname,
              questionDetails: this.state.selectedQuestionDetails
            }
          }
        }/>
      )
    }
    return (
      <InfiniteScroll
        style={{ height: '600px', overflow: 'auto', marginTop: 16 }}
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.questionsList}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
              ]}
              extra={
                <div>
                  <Button type="link" onClick={() => this.redirectToQuestionPanel(item)} style={{ position: 'absolute', right: 35 }}>View Answers</Button>
                  <p style={{color:'#8c8c8c', position: 'absolute', right: 50, marginTop: '30px'}}>{item.date}</p>
                </div>
              }
            >
              <List.Item.Meta 
                avatar={<Avatar src={item.avatar}/>}
                title={<p>{item.title}</p>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    )
  }
}

export default LatestPanel;