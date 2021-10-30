import React from 'react';
import { Descriptions, Table, Space, Button } from 'antd';
import { Redirect } from 'react-router';

class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ellipsis: {
          showTitle: false,
        },
      },
      {
        title: 'Keywords',
        dataIndex: 'keywords',
        key: 'keywords',
        ellipsis: {
          showTitle: false,
        }
      },
      {
        title: 'More',
        key: 'more',
        render: (record) => {
          return (
            <Space size="middle"> 
              <Button 
              type="link" 
              onClick={() => this.redirectToQuestionPanel(
                {
                  questionID: record.questionID,
                  title: `${props.userInfo.firstname} ${props.userInfo.lastname}`,
                  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                  description: 'Keywords: ' + record.keywords,
                  content: record.description,
                  date: record.date
                }
              )}
              >
                View Answers
              </Button>
            </Space>
          )
        }
      }
    ];
    this.state={ 
      userInfo: props.userInfo,
      tableData: [],
      isViewDetails: false,
      selectedQuestionDetails: {}
    }
    this.getQuestions = this.getQuestions.bind(this);
    this.redirectToQuestionPanel = this.redirectToQuestionPanel.bind(this);
  }

  getQuestions() {
    let url = `http://18.116.30.191/JustAsk/fetch_questions?userID=${this.state.userInfo.userID}`;
    
    fetch( url, 
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ tableData: data.map((question, index) => {
          var keywords = '';
          for (let i = 0; i < question.keywords.length; ++i) {
            keywords = keywords + `${question.keywords[i]}, `;
          }
          keywords = keywords.substr(0, keywords.length - 2);


          const curDate = new Date(question.date);
          const Y = curDate.getFullYear() + '-';
          const M = (curDate.getMonth() + 1 < 10 ? '0' + (curDate.getMonth() + 1) : curDate.getMonth() + 1) + '-';
          const D = curDate.getDate() + ' ';
          const h = curDate.getHours() + ':';
          const m = curDate.getMinutes() + ':';
          const s = curDate.getSeconds();
          return {
            questionID: question.id,
            key: `${index}`,
            number: index + 1,
            date: Y+M+D+h+m+s,
            description: question.description,
            keywords: keywords
          }
        }) 
      })
    })
  }

  componentDidMount() {
    this.getQuestions();
  }

  redirectToQuestionPanel(questionDetails) {
    this.setState({ 
      isViewDetails: true, 
      selectedQuestionDetails: questionDetails
    });
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
        <Descriptions 
        title="User Profile" 
        bordered 
        style={{ marginTop: 16 }}
        column={{xxl: 2, xl: 3}}
        >
          <Descriptions.Item label="Username">{this.state.userInfo.username}</Descriptions.Item>
          <Descriptions.Item label="Firstname">{this.state.userInfo.firstname}</Descriptions.Item>
          <Descriptions.Item label="Lastname">{this.state.userInfo.lastname}</Descriptions.Item>
          <Descriptions.Item label="Number Of Posted Questions">{this.state.tableData.length}</Descriptions.Item>
        </Descriptions>
        <div>
          <p style={{ marginTop: 16, fontSize: '16px', fontWeight: 'bold' }}>My Post</p>
          <Table 
          columns={this.columns} 
          dataSource={this.state.tableData}
          pagination={{pageSize: 5}}
          />
        </div>
      </div>
    )
  }
}

export default UserPanel;