import React from 'react'
import { Typography } from "antd"

const { Text } = Typography;

const Center = (props) => (
  <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
    {props.children}
  </div>
)

const CenterText = (props) => (
  <Center>
    <Text className="text">{props.children}</Text>
  </Center>
)

const ComingSoon = (props) => {
    return (
        <CenterText>Coming Soon</CenterText>
    )
}

export default ComingSoon
