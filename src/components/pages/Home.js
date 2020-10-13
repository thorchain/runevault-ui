import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Table, Spin, Icon as AntIcon } from 'antd';

import Binance from "../../clients/binance"
import { StringToAmount } from '../../utils/utility'
import axios from 'axios'

import Breakpoint from 'react-socks';

import { Icon, H1, Text, Button } from '../Components'
import { connect } from 'react-redux';

const Home = (props) => {

    const SYMBOL = "RUNE-B1A"
    const weeklyReward = 500000
    const { stake, leaderboard } = props;
    const [price, setPrice] = useState(null)
    const [value, setValue] = useState(null)
    const [poolAPY, setPoolAPY] = useState(0)
    const [bepswapUsers, setBepswapUsers] = useState(0)
    const [bepswapCapital, setBepswapCapital] = useState(0)

    const antIcon = <AntIcon type="loading" style={{ fontSize: 24 }} spin />;

    const homeStyles = {
        marginLeft: 0,
        marginTop: 40,
        backgroundColor: "#101921"
    }

    const bannerStyles = {
        padding: 30,
        marginLeft: 80,
        marginRight: 80,
        marginTop: 40,
        backgroundColor: "#2B3947",
        borderRadius: 10
    }

    const iconStyles = {
        marginTop: 140,
        backgroundColor: "#101921"
    }

    useEffect(() => {
        getPrice()

    }, [price, stake])

    const getPrice = async () => {
        await Binance.price(SYMBOL)
            .then((response) => {
                setPrice(response)
            })
            .catch((error) => {
                console.error(error)
            })
        const stakeAmt = Number(StringToAmount(stake.sumStake)).toFixed(2)
        const value = Number(price) * stakeAmt
        // console.log(price, value, stake.sumStake, stakeAmt)
        setValue((value).toLocaleString())
        console.log(stake.stakedSupply)
        // let roi = ((weeklyReward * 100) / (stakeAmt)).toFixed(3)
        // setROI(roi)
        // console.log(value, roi, stake.sumStake)


    }

    useEffect(() => {
        getMidgardData()

    }, [])

    const getMidgardData = async () => {
        let resp = await axios.get('https://chaosnet-midgard.bepswap.com/v1/network')
        console.log(resp.data.stakingROI)
        setPoolAPY(resp.data.stakingROI)
        let resp2 = await axios.get('https://chaosnet-midgard.bepswap.com/v1/stats')
        setBepswapUsers(resp2.data.totalUsers)
        let resp3 = await axios.get('https://chaosnet-midgard.bepswap.com/v1/network')
        setBepswapCapital((+resp3.data.totalStaked * 2 + +resp3.data.totalReserve + +resp3.data.bondMetrics.totalActiveBond + +resp3.data.bondMetrics.totalStandbyBond) / 10 ** 8)
    }

    return (
        <div>

            <div style={{ backgroundColor: "#101921" }}>

                <div>
                    <Row style={bannerStyles}>
                        <Col xs={24} lg={18}>
                            <Text color={"#4FE1C4"} size={22} bold={true}>BEPSWAP HAS LAUNCHED</Text><br />
                            <Text color={"#fff"} size={18} bold={true}>Withdraw your RUNE and provide liquidity in a BEPSwap Pool of your choice.</Text><br />
                            <Text color={"#fff"} size={18} bold={true}>BEPSwap Liquidity Providers earn fees and emissions.</Text>


                        </Col>
                        <Col xs={24} lg={3} style={{ paddingTop: 20 }}>

                            <a href="https://chaosnet.bepswap.com/pools" style={{ color: "#fff" }}><Button fill>
                                BEPSWAP <AntIcon type="arrow-right" />
                            </Button></a>
                            <br /><br />
                            <strong><a href="https://docs.thorchain.org/roles/liquidity-providers" style={{ color: "#fff" }}>LEARN MORE</a></strong>
                        </Col>

                    </Row>
                    <Row style={bannerStyles}>
                        <Col xs={24} lg={10}>
                            <h4 style={{ color: "#848E9C" }}>BEPSwap Capital Locked:</h4>
                            <H1>${(bepswapCapital * price).toLocaleString()}</H1>
                        </Col>
                        <Col xs={24} lg={6}>
                            <h4 style={{ color: "#848E9C" }}>Current POOL APY:</h4>
                            <H1>{(poolAPY * 100).toFixed(2)}%</H1>
                        </Col>
                        <Col xs={24} lg={8}>
                            <h4 style={{ color: "#848E9C" }}>BEPSwap Users</h4>
                            <H1>{bepswapUsers} users</H1>
                        </Col>
                    </Row>
                </div>

                <Row style={{}}>
                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={9} style={homeStyles}>



                        <H1>RUNEVault is retiring.</H1>
                        <br></br>
                        <h4 style={{ color: "#848E9C" }}><span> WITHDRAW YOUR RUNE AND MOVE TO BEPSWAP</span>
                        </h4>
                        <h4 style={{ color: "#848E9C" }}><span> Weekly rewards will still continue, but are decreasing every week.</span>
                        </h4>
                        <br></br>
                        <Link to="/stake">
                            <Button style={{ height: 40, width: 250 }}>WITHDRAW NOW</Button>
                        </Link>
                        <br></br>

                        <br></br>
                        <br></br>
                        <Row>
                            <Col xs={24}>
                                <h4 style={{ color: "#848E9C" }}>NUMBER OF STAKERS:</h4>
                                <H1>{stake.totalStakers}</H1>
                            </Col>
                            <Col xs={24} >
                            <br></br>
                                <h4 style={{ color: "#848E9C" }}>TOTAL STAKED:</h4>
                                <H1> {stake.sumStake} RUNE</H1><br />
                                {value &&
                                    <Text size={24}> ($ {value})</Text>
                                }
                            </Col>
                            <Col xs={24}>
                            <br></br>
                                <h4 style={{ color: "#848E9C" }}>STAKED SUPPLY:</h4>
                                {stake.stakedSupply &&
                                    <H1>{stake.stakedSupply}%</H1>
                                }

                            </Col>
                            <Col xs={24}>
                            <br></br>
                                <h4 style={{ color: "#848E9C" }}>LAST UPDATED:</h4>
                                <h4 style={{ color: "#FFF" }}>{stake.lastUpdatedDate}</h4>
                            </Col>
                        </Row>

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

                {!stake.isLoading &&
                    <div>
                        
                        {/* <Row>

                            <Col xs={24} sm={1} md={2} lg={3}>
                            </Col>

                            <Col xs={24} sm={18} md={18} lg={18}>
                                <br /> <br />
                                <p style={{ fontSize: 12, color: "#848E9C" }}>* Rune sourced from Community Reserves, allocated for the purpose of driving long-term engagement from Rune holders.</p>
                                <p style={{ fontSize: 12, color: "#848E9C" }}>** Calculated as {weeklyReward}/{stake.sumStake}</p>
                                <p style={{ fontSize: 12, color: "#848E9C" }}>*** Calculated as {roi}% * 52 </p>
                            </Col>

                            <Col xs={24} sm={1} md={2} lg={3}>
                            </Col>

                        </Row> */}


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
                {stake.isLoading &&
                    <div style={{ textAlign: "center", borderRadius: 4, padding: '340px 50px' }}>
                        <Spin tip="Loading..." indicator={antIcon} style={{ color: 'white' }} />
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
