import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Menu, Layout } from 'antd';
import { Icon } from '../Components'

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

  const handleClick = ({key}) => {
    setPage(key)
  }

  return (
    <Layout.Sider style={{background: "#fff", textTransform: "uppercase", minHeight:500}}>
      <Menu onClick={handleClick} selectedKeys={[page]}>
        {menu_items.map((item) => (
          <Menu.Item key={item} style={getStyles(item)}>
            <Link to={"/" + item}>
              <Icon icon={getIcon(item)} style={styles} />&nbsp;<span>{item}</span>
            </Link>
          </Menu.Item>
        ))
        }
      </Menu>
    </Layout.Sider>
  )
}

export default Sidebar
