import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Menu, Layout } from 'antd';
import { Text, Icon } from '../Components'

const Sidebar = (props) => {

  const menu_items = [
    "multi-send",
    "multi-sig",
    "escrow",
    "hedge-escrow",
    "dao",
    "swap",
  ]

  const [page, setPage] = useState(null)

  useEffect(() => {
    let pathname = window.location.pathname.split("/")[1] 
    if (!menu_items.includes(pathname)) {
      setPage(pathname)
    }
  }, [menu_items])

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
  
  const getBold = (key) => {
    return key === page
  }

  const handleClick = ({key}) => {
    setPage(key)
  }

  const sidebarStyles = {
    background: "#fff",
    textTransform: "uppercase",
    minHeight: 500,
    zIndex: 10,
    position: "relative",
    boxShadow: "0 2px 16px 0 rgba(0,0,0,0.09)",
  }

  return (
    <Layout.Sider style={sidebarStyles}>
      <Menu onClick={handleClick} selectedKeys={[page]}>
        {menu_items.map((item) => (
          <Menu.Item key={item} style={getStyles(item)}>
            <Link to={"/" + item}>
              <Icon icon={getIcon(item)} style={styles} />&nbsp;<Text bold={getBold(item)}>{item}</Text>
            </Link>
          </Menu.Item>
        ))
        }
      </Menu>
    </Layout.Sider>
  )
}

export default Sidebar
