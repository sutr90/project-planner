import React from 'react'
import { Row, Col } from 'antd';
import Table from './Table'
import CenteredTree from './CenteredTree';
import CytoscapeGraph from './CytoscapeGraph';

export default function AppLayout() {
    return <Row>
        <Col sm={12}><Table /></Col>
        <Col sm={12}><CytoscapeGraph /></Col>
    </Row>
}