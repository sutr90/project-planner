import React from 'react'
import { Row, Col } from 'antd';
import Table from './components/Table'
import CytoscapeGraph from './components/CytoscapeGraph';

export default function AppLayout() {
    return <Row>
        <Col sm={8}><Table /></Col>
        <Col sm={16}><CytoscapeGraph /></Col>
    </Row>
}