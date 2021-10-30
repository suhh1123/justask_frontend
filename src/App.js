import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Question from './components/question/Question';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Layout from 'antd/lib/layout/layout';

function App() {
  return (
    <Router>
      <Layout className="mainLayout">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/question" component={Question} />
          <Redirect exact from='/' to="/login" />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

