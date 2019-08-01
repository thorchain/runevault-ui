import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Layout} from 'antd';

import {BreakpointProvider} from 'react-socks';

import {ContextProvider} from "./context"

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/pages/Home'
import Stake from './components/pages/Stake'
import Unlock from './components/pages/Wallet/Unlock'
import Wallet from './components/pages/Wallet/index'
import Leaderboard from './components/pages/leaderboard';

import 'antd/dist/antd.css'
import './App.css'
import { connect } from 'react-redux';
import {saveStakeEaringsData, saveStakeEarningsColumn, sumStake} from "./actions/stakeaction";
import {saveLeaderboardColumns} from "./actions/leaderboardaction";
import { Spin, Icon } from 'antd';

const {Content} = Layout;

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(sumStake());
        this.props.dispatch(saveLeaderboardColumns());
        this.props.dispatch(saveStakeEarningsColumn());
        this.props.dispatch(saveStakeEaringsData());
    }

    render() {

        const {stake} = this.props;

        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

        if(stake.isLoading) {
            return (
                <div style={{textAlign: "center", borderRadius: 4, padding: '340px 50px'}}>
                    <Spin tip="Loading..." indicator={antIcon} style={{color: 'white'}} />
                </div>
            );
        }

        return (
            <ContextProvider>
                <Router>
                    <div>
                        <BreakpointProvider>
                            <Layout>
                                <Header/>
                                <Layout style={{background: "#101921", minHeight: "100vh"}}>
                                    <Content style={{
                                        background: "#101921",
                                        padding: '0 20px',
                                        marginBottom: 200,
                                        marginTop: 64
                                    }}>
                                        <Switch>
                                            <Route path="/" exact component={Home}/>
                                            <Route path="/stake" exact component={Stake}/>
                                            <Route path="/wallet" exact component={Wallet}/>
                                            <Route path="/wallet/unlock" exact component={Unlock}/>
                                            <Route path="/leaderboard" exact component={Leaderboard}/>
                                        </Switch>
                                    </Content>
                                </Layout>
                                <Footer/>
                            </Layout>
                        </BreakpointProvider>
                    </div>
                </Router>
            </ContextProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        stake: state.stake
    };
}

export default connect(mapStateToProps)(App);
