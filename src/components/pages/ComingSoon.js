import React from 'react'
import { Row, Col } from 'antd'

import { Center, Icon, Text } from '../Components'

const ComingSoon = ({title, description, icon}) => {
  return (
    <div style={{marginTop: 100}}>
      <Row>
        <Col offset={6} span={12}>
          <Row>
            <Center>
              <Icon icon={icon} />
            </Center>
          </Row>
          <Row style={{margin: "20px 0px"}}>
            <Center>
              <Text size={18} bold>{title}</Text>
            </Center>
          </Row>
          <Row>
            <Center>
              <Text>{description}</Text>
            </Center>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default ComingSoon
