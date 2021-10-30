import React from 'react';
import { Input, List, Avatar, Space, Button, message } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import { Redirect } from 'react-router';

const { Search } = Input;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userInfo: props.userInfo,
      questionsList: [],
      submitting: false,
      value: '',
      isViewDetails: false,
      selectedQuestionDetails: {}
    };
    this.redirectToQuestionPanel = this.redirectToQuestionPanel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchSuccessInfo = this.searchSuccessInfo.bind(this);
    this.searchFailureInfo = this.searchFailureInfo.bind(this);
    this.searchWarnningInfo = this.searchWarnningInfo.bind(this);
  }

  searchQuestions = value => {
    const request = {sentence: value};
    
    this.setState({
      submitting: true,
    });

    if (request.sentence === '') {
      this.setState ({
        submitting: false
      })
      this.searchWarnningInfo();
      return;
    }

    fetch('http://18.116.30.191/JustAsk/search', 
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
      if (data.length !== 0) {
        this.searchSuccessInfo();
      } else {
        this.searchFailureInfo();
      }
      this.setState({
        submitting: false,
        value: ''
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

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  searchSuccessInfo = () => {
    message.success('Search Success');
  };

  searchFailureInfo = () => {
    message.error('No relative questions can be found');
  }

  searchWarnningInfo = () => {
    message.warn('Please don\'t put in an empty test')
  }

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
      <div>
        <Search 
          placeholder="input search text" 
          enterButton="Search" 
          size="large"
          style={{ marginTop: 16 }}
          value={this.state.value}
          loading={this.state.submitting}
          onSearch={this.searchQuestions}
          onChange={this.handleChange}
          
        />
        <InfiniteScroll
          style={{ height: '600px', overflow: 'auto', marginTop: 16}}
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
                    <Button 
                      type="link" 
                      onClick={() => this.redirectToQuestionPanel(item)} 
                      style={{ position: 'absolute', right: 35 }}
                    >
                      View Answers
                    </Button>
                    <p 
                      style={{color:'#8c8c8c', position: 'absolute', right: 50, marginTop: '30px'}}
                    >
                      {item.date}
                    </p>
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
      </div>
    )
  }
}

export default SearchPanel;