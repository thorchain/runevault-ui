import React from 'react'
import { Layout } from 'antd';
import Center from "../utility/Center"

const Footer = (props) => {
  return (
    <Layout.Footer style={{background: "#fff"}}>
      <div>
        <p>
          <Center>
            Made with &nbsp;<span role="img" aria-label="" aria-hidden={false}>❤️</span>  from the &nbsp;<strong style={{fontWeight: "bolder", fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}><a rel="noopener noreferrer" href="https://canya.io" style={{color:"#33ccff"}} target="_blank">CanYa Team</a></strong>
          </Center>
        </p>
      </div>
    </Layout.Footer>
  )
}

export default Footer
