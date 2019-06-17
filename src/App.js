import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';

import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'

import 'antd/dist/antd.css'
import './App.css'

const { Content } = Layout;

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <Layout style={{background: "#fff"}}>
          <Header />
          <Layout>
            <Sidebar />
            <Content style={{background: "#fff"}}>
              <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/about/" component={About} />
                <Route path="/users/" component={Users} />
              </Switch>
            </Content>
          </Layout>
          <Footer />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
