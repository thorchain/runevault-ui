import React, {Component} from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Table } from 'antd';

import Breakpoint from 'react-socks';

import { Icon, H1, Button, Text } from '../Components'
import { connect } from 'react-redux';
import { sumStake } from "../../actions/stakeaction";


const homeStyles = {
  marginLeft: 0,
  marginTop: 40,
  backgroundColor: "#101921"
}

const iconStyles = {
  marginTop: 140,
  backgroundColor: "#101921"
}



class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(sumStake());
    }

    render() {

        const {stake} = this.props;

        return (
            <div style={{backgroundColor: "#101921"}}>
                <Row style={{}}>
                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={9} style={homeStyles}>

                        <H1>STAKE RUNE AND EARN</H1>
                        <br></br>
                        <h4 style={{color: "#848E9C"}}><span>STAKE RUNE TO EARN WEEKLY COMPOUNDED INTEREST UNTIL THE LAUNCH OF </span>
                            <span><strong><a href="/" style={{color: "#fff"}}>BEPSWAP</a></strong></span>
                        </h4>
                        <br></br>
                        <p>1) Stake your RUNE using this interface.</p>
                        <p>2) Earn a percent of your balance compounded every week until the launch of BEPSwap (maximum
                            of 10 weeks).</p>
                        <p>3) When BEPSwap launches, withdraw and stake your total earnings in a liquidity pool and
                            continue earning. </p>
                        <br></br>
                        <Link to="/stake">
                            <Button style={{height: 40, width: 250}}>STAKE NOW</Button>
                        </Link>
                        <br></br>
                        <br></br>
                        <Text>Check out the</Text>
                        <a href="https://medium.com/thorchain/introducing-runevault-stake-and-earn-rune-87576671d1e4"
                           target="_blank" rel="noopener noreferrer">
                            <Text style={{fontWeight: 'bold'}}> announcement.</Text>
                        </a>
                        <br></br>

                    </Col>

                    <Col xs={24} sm={2} md={2} lg={2}>
                    </Col>

                    <Breakpoint medium up>
                        <Col xs={24} sm={8} md={8} lg={9} style={iconStyles}>
                            <Icon icon="rune" style={{width: "auto"}}/>
                        </Col>
                    </Breakpoint>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                </Row>

                <Row style={{marginTop: 100}}>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                    <Col xs={24} sm={11} md={10} lg={9}>
                        <h4 style={{color: "#848E9C"}}>NUMBER OF STAKERS:</h4>
                        <H1>{stake.totalStakers}</H1>
                    </Col>

                    <Col xs={24} sm={11} md={10} lg={9}>

                    </Col>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                </Row>

                <Row style={{marginTop: 50}}>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                    <Col xs={24} sm={13} md={12} lg={11}>
                        <h4 style={{color: "#848E9C"}}>TOTAL STAKED:</h4>
                        <H1> {stake.sumStake} RUNE</H1>
                    </Col>

                    <Col xs={24} sm={9} md={8} lg={7}>
                        <h4 style={{color: "#848E9C"}}>STAKED SUPPLY:</h4>
                        <H1>{stake.stakedSupply}%</H1>
                    </Col>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                </Row>

                <Row style={{marginTop: 50}}>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                    <Col xs={12} sm={11} md={10} lg={9}>
                        <h4 style={{color: "#848E9C"}}>LAST UPDATED:</h4>
                        <h4 style={{color: "#FFF"}}>{stake.lastUpdatedDate}</h4>
                    </Col>

                    <Col xs={12} sm={11} md={10} lg={9}>
                    </Col>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                </Row>

                <Row style={{marginTop: 100}}>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                    <Col xs={24} sm={22} md={20} lg={18}
                         style={{backgroundColor: '#D8D8D8', borderRadius: 5, paddingBottom: 5}}>
                        <Table dataSource={dataSource} columns={columns} pagination={false} size={'middle'}
                               title={() => 'EARNINGS SCHEDULE'}/>
                    </Col>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                </Row>


            </div>
        )
    }
}



const dataSource = [
  {
    key: '1',
    week: '1',
    interest: '0.2%',
    compounded: '0.2%',
  },
  {
    key: '2',
    week: '2',
    interest: '0.4%',
    compounded: '0.6%',
  },
  {
    key: '3',
    week: '3',
    interest: '0.6%',
    compounded: '1.2%',
  },
  {
    key: '4',
    week: '4',
    interest: '0.8%',
    compounded: '2.0%',
  },
  {
    key: '5',
    week: '5',
    interest: '1.0%',
    compounded: '3.0%',
  },
  {
    key: '6',
    week: '6',
    interest: '1.2%',
    compounded: '4.3%',
  },
  {
    key: '7',
    week: '7',
    interest: '1.4%',
    compounded: '5.7%',
  },
  {
    key: '8',
    week: '8',
    interest: '1.6%',
    compounded: '7.4%',
  },
  {
    key: '9',
    week: '9',
    interest: '1.8%',
    compounded: '9.4%',
  },
  {
    key: '10',
    week: '10',
    interest: '2%',
    compounded: '11.5%',
  },
];

const columns = [
  {
    title: 'Week',
    dataIndex: 'week',
    key: 'week',
  },
  {
    title: 'Interest',
    dataIndex: 'interest',
    key: 'interest',
  },
  {
    title: 'Compounded Interest',
    dataIndex: 'compounded',
    key: 'compounded',
  },
];

function mapStateToProps(state) {
    return {
        stake: state.stake
    };
}

export default connect(mapStateToProps)(Home)
