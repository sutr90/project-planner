import React from 'react'
import { Row, Col } from 'antd';
import Table from './Table'

export default function AppLayout() {
    return <Row>
        <Col sm={12}><Table /></Col>
        <Col sm={12}><Row gutter={8}>right col</Row></Col>
    </Row>
}