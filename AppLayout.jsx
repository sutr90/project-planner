import React from 'react'
import { Row, Col } from 'antd';
import Table from './Table'

export default class AppLayout extends React.Component {
    render() {
        return <Row>
            <Col sm={12}><Table/></Col>
            <Col sm={12}>right col</Col>
        </Row>
    }
}