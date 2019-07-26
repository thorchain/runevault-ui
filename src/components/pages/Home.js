import React from 'react'
import { Link } from "react-router-dom"
import { Row, Col } from 'antd';

import { Icon, H1, Button, Text } from '../Components'


const homeStyles = {
  marginLeft: 0,
  marginTop: 80,
  backgroundColor: "#101921"
}

const iconStyles = {
  marginTop: 140,
  backgroundColor: "#101921"
}



const Home = (props) => {

  return (
    <div style={{backgroundColor:"#101921"}}>
      <Row>
        <Col xs={24} sm={1} md={2} lg={3}>
        </Col>

      <Col xs={24} sm={12} md={12} lg={9} style={homeStyles}>

        <H1>STAKE RUNE AND EARN</H1>
        <br></br>
        <h4 style={{color:"#848E9C"}}><span>STAKE RUNE TO EARN WEEKLY COMPOUNDED INTEREST UNTIL THE LAUNCH OF </span>
        <span><strong><a href="/" style={{color:"#fff"}}>BEPSWAP</a></strong></span>
        </h4>
        <br></br>
        <p>1) Stake your RUNE using this interface.</p>
        <p>2) Earn a percent of your balance compounded every week until the launch of BEPSwap (maximum of 10 weeks).</p>
        <p>3) When BEPSwap launches, withdraw and stake your total earnings in a liquidity pool and continue earning. </p>
        <br></br>
        <Link to="/stake">
          <Button style={{height:40, width:300}}>STAKE NOW</Button>
        </Link>
          <br></br>
            <br></br>
        <Text>Check out the</Text>
        <a href="https://medium.com/thorchain/introducing-runevault-stake-and-earn-rune-87576671d1e4"
          target="_blank" rel="noopener noreferrer">
          <Text style={{fontWeight: 'bold'}}> announcement.</Text>
        </a>

        </Col>

        <Col xs={24} sm={2} md={2} lg={2}>
        </Col>

        <Col xs={24} sm={8} md={8} lg={9} style={iconStyles}>
          <Icon icon="rune" style={{width: "auto"}}/>
          </Col>

          <Col xs={24} sm={1} md={2} lg={3}>
          </Col>

      </Row>
    </div>
  )
}

export default Home
