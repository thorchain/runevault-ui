import React from 'react'
import { Layout, Row, Col} from 'antd';

import { Center, Icon } from '../Components'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFacebookF, faTwitter, faYoutube, faReddit, faGithub, faTelegram} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookF, faTwitter, faYoutube, faReddit, faGithub, faTelegram);

const Footer = (props) => {

  const footerStyles = {
    backgroundColor:"#2B3947",
    textTransform: "uppercase",
    zIndex: 1,
    position: "fixed",
    left:0,
    bottom:0,
    right:0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "left",
    fontSize: 18,
  }

  const thorchainTwitter = "https://twitter.com/thorchain_org?lang=en";
  const thorchainGithub = "https://github.com/thorchain";
  const thorchianTelegram = "https://t.me/thorchain_org";
  const thorchainYoutube = "https://www.youtube.com/channel/UC6ZiZuysJZRFQKv8Zn8OG0g";
  const thorchainReddit = "https://www.reddit.com/r/THORChain/";
  // const thorchainOrg = "https://thorchain.org/";



  return (
    <Layout.Footer style={footerStyles}>
      <div>

        <Row>
          <Col xs={24} sm={24} md={24} lg={4} xl={4}>
            <Icon icon="logo" style={{width:"100"}} />
          </Col>

          <Col xs={24} sm={16} md={16} lg={14} xl={14}>
            <Center></Center>
          </Col>

          <Col xs={24} sm={8} md={8} lg={6} xl={6}>
            <Row>
              <Col xs={3}>
              </Col>
              <Col xs={3}>
                <FontAwesomeIcon icon={faFacebookF} style={{ color: '#919D9D' }}  />
              </Col>
              <Col xs={3}>
                <a href={thorchainTwitter}><FontAwesomeIcon icon={faTwitter} style={{ color: '#919D9D' }}/></a>
              </Col>
              <Col xs={3}>
                <a href={thorchainYoutube}><FontAwesomeIcon icon={faYoutube} style={{ color: '#919D9D' }}/></a>
              </Col>
              <Col xs={3}>
                <a href={thorchainReddit}><FontAwesomeIcon icon={faReddit} style={{ color: '#919D9D' }}/></a>
              </Col>
              <Col xs={3}>
                <a href={thorchainGithub}><FontAwesomeIcon icon={faGithub} style={{ color: '#919D9D' }}/></a>
              </Col>
              <Col xs={3}>
                <a href={thorchianTelegram}><FontAwesomeIcon icon={faTelegram} style={{ color: '#919D9D' }}/></a>
              </Col>
              <Col xs={3}>
              </Col>
            </Row>
          </Col>

        </Row>

      </div>
    </Layout.Footer>
  )
}

export default Footer
