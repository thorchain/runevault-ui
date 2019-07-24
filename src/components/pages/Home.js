import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Card } from 'antd';

import { Center, Icon, Text, H1, Button } from '../Components'


const homeStyles = {
  marginLeft: 0,
  marginTop: 80,
  backgroundColor: "#101921"
}



const Home = (props) => {

  return (
    <div style={{backgroundColor:"#101921"}}>
      <Row>
        <Col xs={3}>
        </Col>
      <Col xs={12} sm={12} md={9} style={homeStyles}>

        <H1>STAKE RUNE AND EARN</H1>
        <br></br>
        <h4 style={{color:"#848E9C"}}><span>STAKE RUNE TO EARN WEEKLY EMISSIONS UNTIL THE LAUNCH OF </span>
        <span><strong><a href="" style={{color:"#fff"}}>BEPSWAP</a></strong></span>
        </h4>
        <br></br>
        <p>1) Stake your RUNE using this interface.</p>
        <p>2) Earn 1% of your staked balance per week until the launch of BEPSwap.</p>
        <p>3) On the launch of BEPSwap, withdraw and stake your earnings in the pool of your choice. </p>
        <br></br>
        <Link to="/wallet/unlock">
          <Button style={{height:40, width:300}}>STAKE NOW</Button>
        </Link>

        </Col>


        <Col xs={12} sm={12} md={9} style={homeStyles}>

          <Icon icon="rune" style={{width:500, marginLeft:100}} />

          </Col>

          <Col xs={3}>
          </Col>
      </Row>
    </div>
  )
}

export default Home
