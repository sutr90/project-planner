import React from 'react'
import { Row, Col } from 'antd';
import Table from './Table'

export default class AppLayout extends React.Component {
    render() {
        return <Row>
            <Col span={12}><Table/></Col>
            <Col span={12}>right col</Col>
        </Row>
    }
}