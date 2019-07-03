import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Menu, Layout } from 'antd';
import { Text, Icon, } from '../Components'

import Footer from './Footer'

const Sidebar = (props) => {

  const menu_items = [
    "multi-send",
    "multi-sig",
    "escrow",
    "hedged-escrow",
    "dao",
    "swap",
  ]

  const [page, setPage] = useState(null)

  useEffect(() => {
    let pathname = window.location.pathname.split("/")[1]
    if (menu_items.includes(pathname)) {
      setPage(pathname)
    }
  }, [menu_items])

  const styles = {
    width: 25,
  }

  const selected_styles = {
    backgroundColor: "#ededed",
    color: "#F0B90B",
  }

  const getStyles = (key) => {
    if (key === page) {
      return selected_styles
    } else {
      return {}
    }
  }

  const getIcon = (key) => {
    if (isSelected(key)) {
      return key+"-active"
    } else {
      return key+"-inactive"
    }
  }

  const isSelected = (key) => {
    return key === page
  }

  const handleClick = ({key}) => {
    setPage(key)
  }

  const sidebarStyles = {
    background: "#fff",
    textTransform: "uppercase",
    zIndex: 1,
    position: "relative",
    boxShadow: "0 2px 16px 0 rgba(0,0,0,0.09)",
  }

  return (
    <Layout.Sider style={sidebarStyles}>
      <Menu onClick={handleClick} selectedKeys={[page]}>
        {menu_items.map((item) => (
          <Menu.Item key={item} style={getStyles(item)}>
            <Link to={"/" + item}>
              <Icon icon={getIcon(item)} style={styles} />&nbsp;{isSelected(item)? <Text bold={true} color="#F0B90B">{item}</Text> : <Text>{item}</Text>}
            </Link>
          </Menu.Item>
        ))}
      </Menu>

      <Footer />

    </Layout.Sider>
  )
}

export default Sidebar
