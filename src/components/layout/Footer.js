import React from 'react'
import { Layout, Row, Col} from 'antd';
import { Center } from '../Components'

const Footer = (props) => {

  const footerStyles = {
    background: "#fff",
    textTransform: "uppercase",
    zIndex: 0,
    position: "absolute",
    left:0,
    bottom:0,
    right:0,
    fontSize: 10,
    paddingTop: 5,
    paddingBottom: 100,
    paddingLeft: 10,
    paddingRight: 5,
    textAlign: "left"
  }

  const emojiStyles = {
    fontWeight: "bolder",
    fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  }


  return (
    <Layout.Footer style={footerStyles}>
      <div>
        <Row>
          <Col>
            Made with &nbsp;
            <span role="img" aria-label="" aria-hidden={false}>❤️</span>
            &nbsp; from the
          </Col>
        </Row>
        <Row>
          <Col>
            <strong style={emojiStyles}>
            <a rel="noopener noreferrer" href="https://canya.io" style={{color:"#33ccff"}} target="_blank">CanYa Team</a>
             </strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <br></br>
                Supported by the
          </Col>
        </Row>
        <Row>
          <Col>
              <strong>
                <a rel="noopener noreferrer" href="https://binancefellowship.com" style={{color:"#33ccff"}} target="_blank">Binance Fellowship Program</a>
              </strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <br></br>
                This tool is open source.
          </Col>
        </Row>
        <Row>
          <Col>
              <strong>
                <a rel="noopener noreferrer" href="https://gitlab.com/canyacoin/binancechain/binancetools" style={{color:"#F0B90B"}} target="_blank">CHECK ON GITLAB</a>
              </strong>
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  )
}

export default Footer
