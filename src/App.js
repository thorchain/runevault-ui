import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';

import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'

import ComingSoon from './components/pages/ComingSoon'

import 'antd/dist/antd.css'
import './App.css'

const { Content } = Layout;

function Index() {
  return <h2>Home</h2>;
}

const App = (props) => {
  return (
    <Router>
      <div>
        <Layout>
          <Header />
          <Layout>
            <Sidebar />
            <Content style={{background: "#fff"}}>
              <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/multi-send/" component={ComingSoon} />
                <Route path="/multi-sig/" component={ComingSoon} />
                <Route path="/escrow/" component={ComingSoon} />
                <Route path="/hedge-escrow/" component={ComingSoon} />
                <Route path="/dao/" component={ComingSoon} />
                <Route path="/swap/" component={ComingSoon} />
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
