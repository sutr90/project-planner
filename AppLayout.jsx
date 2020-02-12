import React from 'react'
import { Row, Col } from 'antd';
import Table from './Table'
import CytoscapeGraph from './CytoscapeGraph';

export default function AppLayout() {
    return <Row>
        <Col sm={8}><Table /></Col>
        <Col sm={16}><CytoscapeGraph /></Col>
    </Row>
}