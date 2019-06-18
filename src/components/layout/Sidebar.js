import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Menu, Layout } from 'antd';
import Image from '../Image'

const Sidebar = (props) => {
  const [page, setPage] = useState(window.location.pathname.split("/")[1])

  useEffect(() => {
    console.log("Pathname change:", window.location.pathname)
  }, [])

  const styles = {
    width: 25,
  }

  const selected_styles = {
    color: "inherit",
    backgroundColor: "#ededed",
  }

  const getStyles = (key) => {
    if (key === page) {
      return selected_styles
    } else {
      return {}
    }
  }

  const getIcon = (key) => {
    if (key === page) {
      return key+"-active"
    } else {
      return key+"-inactive"
    }
  }

  const handleClick = ({key}) => {
    setPage(key)
  }

  const items = [
    "multi-send",
    "multi-sig",
    "escrow",
    "hedge-escrow",
    "dao",
    "swap",
  ]

  return (
    <Layout.Sider style={{background: "#fff", textTransform: "uppercase", minHeight:500}}>
      <Menu onClick={handleClick} selectedKeys={[page]}>
        {items.map((item) => (
          <Menu.Item key={item} style={getStyles(item)}>
            <Link to={item}>
              <Image img={getIcon(item)} style={styles} />&nbsp;<span>{item}</span>
            </Link>
          </Menu.Item>
        ))
        }
      </Menu>
    </Layout.Sider>
  )
}

export default Sidebar
