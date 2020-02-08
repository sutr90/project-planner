import React from 'react'
import { Row, Col } from 'antd';
import Table from './Table'
import VisNetwork from './VisNetwork';

export default function AppLayout() {
    return <Row>
        <Col sm={12}><Table /></Col>
        <Col sm={12}><VisNetwork /></Col>
    </Row>
}