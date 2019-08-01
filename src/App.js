import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';

import { BreakpointProvider } from 'react-socks';

import { ContextProvider } from "./context"

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/pages/Home'
import Stake from './components/pages/Stake'
import Unlock from './components/pages/Wallet/Unlock'
import Wallet from './components/pages/Wallet/index'
import Leaderboard from './components/pages/leaderboard';

import 'antd/dist/antd.css'
import './App.css'

const { Content } = Layout;

const App = (props) => {
  return (
    <ContextProvider>
      <Router>
        <div>
          <BreakpointProvider>
          <Layout>
            <Header />
            <Layout style={{background: "#101921", minHeight: "100vh"}} >
              <Content style={{background: "#101921", padding: '0 20px', marginBottom: 200, marginTop: 64}}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/stake" exact component={Stake} />
                  <Route path="/wallet" exact component={Wallet} />
                  <Route path="/wallet/unlock" exact component={Unlock} />
                  <Route path="/leaderboard" exact component={Leaderboard} />
                </Switch>
              </Content>
            </Layout>
            <Footer />
          </Layout>
          </BreakpointProvider>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
