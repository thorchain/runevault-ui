import React, { Component, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Table } from 'antd';

import Binance from "../../clients/binance"
import { StringToAmount } from '../../utils/utility'

import Breakpoint from 'react-socks';

import { Icon, H1, Text, Button } from '../Components'
import { connect } from 'react-redux';

const Home = (props) => {
    const SYMBOL = "RUNE-B1A"
    const { stake, leaderboard } = props;
    const [price, setPrice] = useState(null)
    const [value, setValue] = useState(null)


    const homeStyles = {
        marginLeft: 0,
        marginTop: 40,
        backgroundColor: "#101921"
    }

    const iconStyles = {
        marginTop: 140,
        backgroundColor: "#101921"
    }

    useEffect(() => {
        getPrice()

    }, [price])

    const getPrice = () => {
        Binance.price(SYMBOL)
            .then((response) => {
                setPrice(response)
            })
            .catch((error) => {
                console.error(error)
            })
            const value = Number(price)*Number(StringToAmount(stake.sumStake)).toFixed(2)
            // console.log(price, value, stake.sumStake)
            setValue((value).toLocaleString())
    }

    return (
        <div>
            {stake &&
                <div style={{ backgroundColor: "#101921" }}>
                    <Row style={{}}>
                        <Col xs={24} sm={1} md={2} lg={3}>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={9} style={homeStyles}>

                            <H1>STAKE RUNE AND EARN</H1>
                            <br></br>
                            <h4 style={{ color: "#848E9C" }}><span>STAKE RUNE TO EARN WEEKLY UP TO THE LAUNCH OF </span>
                                <span><strong><a href="/" style={{ color: "#fff" }}>BEPSWAP</a></strong></span>
                            </h4>
                            <br></br>
                            <p>1) Stake your RUNE using this interface.</p>
                            <p>2) 1,000,000 RUNE distributed weekly to stakers. Amount will reduce on launch of Chaosnet.*</p>
                            <p>3) When THORChain mainnet launches, RUNEVault will be retired. You can continue staking in BEPSwap and later, ASGARDEX.</p>
                            <br></br>
                            <p style={{ fontSize: 12 }}>* Rune sourced from Community Reserves, allocated for the purpose of driving long-term engagement from Rune holders.</p>
                            <br></br>
                            <Link to="/stake">
                                <Button style={{ height: 40, width: 250 }}>STAKE NOW</Button>
                            </Link>
                            <br></br>
                            <br></br>

                        </Col>

                        <Col xs={24} sm={2} md={2} lg={2}>
                        </Col>

                        <Breakpoint medium up>
                            <Col xs={24} sm={8} md={8} lg={9} style={iconStyles}>
                                <Icon icon="rune" style={{ width: 450 }} />
                            </Col>
                        </Breakpoint>

                        <Col xs={24} sm={1} md={2} lg={3}>
                        </Col>

                    </Row>

                    {!stake.isError &&
                        <div>
                            <Row style={{ marginTop: 100 }}>

                                <Col xs={24} sm={1} md={2} lg={3}>
                                </Col>

                                <Col xs={24} sm={11} md={10} lg={9}>
                                    <h4 style={{ color: "#848E9C" }}>NUMBER OF STAKERS:</h4>
                                    <H1>{stake.totalStakers}</H1>
                                </Col>

                                <Col xs={24} sm={11} md={10} lg={9}>
                                    <h4 style={{ color: "#848E9C" }}>ROI: WEEKLY | ANNUALISED</h4>
                                    <H1>{stake.weeklyROI}% | {stake.weeklyROI * 52}%</H1>
                                </Col>

                                <Col xs={24} sm={1} md={2} lg={3}>
                                </Col>

                            </Row>

                            <Row style={{ marginTop: 50 }}>

                                <Col xs={24} sm={1} md={2} lg={3}>
                                </Col>

                                <Col xs={24} sm={11} md={10} lg={9}>
                                    <h4 style={{ color: "#848E9C" }}>TOTAL STAKED:</h4>
                                    <H1> {stake.sumStake} RUNE</H1><br/>
                                    {value &&
                                    <Text size={24}> ($ {value})</Text>
                                    }
                                    
                                    {/* <H1> ${(stake.sumStake * this.state.price * 100)/100} USD</H1> */}
                                </Col>

                                <Col xs={24} sm={11} md={10} lg={9}>
                                    <h4 style={{ color: "#848E9C" }}>STAKED SUPPLY:</h4>
                                    <H1>{stake.stakedSupply}%</H1>
                                </Col>

                                <Col xs={24} sm={1} md={2} lg={3}>
                                </Col>

                            </Row>

                            <Row style={{ marginTop: 50 }}>

                                <Col xs={24} sm={1} md={2} lg={3}>
                                </Col>

                                <Col xs={12} sm={11} md={10} lg={9}>
                                    <h4 style={{ color: "#848E9C" }}>LAST UPDATED:</h4>
                                    <h4 style={{ color: "#FFF" }}>{stake.lastUpdatedDate}</h4>
                                </Col>

                                <Col xs={12} sm={11} md={10} lg={9}>
                                </Col>

                                <Col xs={24} sm={1} md={2} lg={3}>
                                </Col>

                            </Row>

                            <Row style={{ marginTop: 100 }}>

                                <Col xs={24} sm={1} md={2} lg={3}>
                                </Col>

                                <Col xs={24} sm={22} md={20} lg={18}
                                    style={{ backgroundColor: '#D8D8D8', borderRadius: 5, paddingBottom: 5 }}>
                                    <Table dataSource={stake.dataSource} columns={leaderboard.leaderboardColumns}
                                        pagination={false} size={'middle'}
                                        title={() => 'LEADERBOARD'} />
                                </Col>

                            </Row>

                            <Row style={{ marginTop: 30 }}>
                                <Col xs={2} sm={4} md={6} lg={8} xl={8}>

                                </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={4}>

                                </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={5}>

                                </Col>
                                <Col xs={20} sm={16} md={12} lg={8} xl={3}>
                                    <Link to="/leaderboard">
                                        <Button style={{ height: 40, width: 237 }}>VIEW ALL</Button>
                                    </Link>
                                </Col>

                            </Row>
                        </div>
                    }

                    {stake.isError &&
                        <Row style={{ marginTop: 100 }}>

                            <Col xs={24} sm={1} md={2} lg={3}>
                            </Col>

                            <Col xs={24} sm={11} md={10} lg={9}>
                                <H1>Whoops!! Something went wrong. Please refresh</H1>
                            </Col>

                            <Col xs={24} sm={11} md={10} lg={9}>

                            </Col>

                            <Col xs={24} sm={1} md={2} lg={3}>
                            </Col>

                        </Row>
                    }
                </div>
            }
        </div>
    )

}



function mapStateToProps(state) {
    return {
        stake: state.stake,
        leaderboard: state.leaderboard
    };
}

export default connect(mapStateToProps)(Home)
