import React from 'react'
import { Row, Col } from 'antd'

import { Center, Icon, H1, Text } from '../Components'

const ComingSoon = ({title, description, icon}) => {
  return (
    <div style={{marginTop: 30}}>
      <Row>
        <Col offset={6} span={12}>
          <Row style={{margin: "10px 0px"}}>
            <Center>
              <Icon icon={icon} />
            </Center>
          </Row>
          <Row style={{margin: "10px 0px"}}>
            <Center>
              <Text size={18} bold>{title}</Text>
            </Center>
          </Row>
          <Row style={{margin: "10px 0px"}}>
            <Center>
              <Text>{description}</Text>
            </Center>
          </Row>
          <Row style={{margin: "10px 0px"}}>
            <Center>
              <H1>coming soon...</H1>
            </Center>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default ComingSoon
