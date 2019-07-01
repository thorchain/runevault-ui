import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';

import { ContextProvider } from "./context"

import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'

import Home from './components/pages/Home'
import MultiSend from './components/pages/MultiSend'
import MultiSig from './components/pages/MultiSig'
import Escrow from './components/pages/Escrow'
import HEscrow from './components/pages/HedgeEscrow'
import DAO from './components/pages/DAO'
import Swap from './components/pages/Swap'
import Unlock from './components/pages/Wallet/Unlock'
import Wallet from './components/pages/Wallet/index'

import 'antd/dist/antd.css'
import './App.css'

const { Content } = Layout;

const App = (props) => {
  return (
    <ContextProvider>
      <Router>
        <div>
          <Layout>
            <Header />
            <Layout style={{height:"100vh"}}>
              <Sidebar />
              <Content style={{background: "#fff"}}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/multi-send" exact component={MultiSend} />
                  <Route path="/multi-sig" exact component={MultiSig} />
                  <Route path="/escrow" exact component={Escrow} />
                  <Route path="/hedged-escrow" eact component={HEscrow} />
                  <Route path="/dao" exact component={DAO} />
                  <Route path="/swap" exact component={Swap} />
                  <Route path="/wallet" exact component={Wallet} />
                  <Route path="/wallet/unlock" exact component={Unlock} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
