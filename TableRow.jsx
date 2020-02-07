import React from 'react'
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import './Table.scss'

export default function TableRow(props) {
    const { row } = props;

    return <Row className="table-row">
        <Col sm={2}>{row.id}</Col>
        <Col sm={4}>{row.name}</Col>
        <Col sm={2}>{row.cost}</Col>
        <Col sm={6}>{row.deps}</Col>
        <Col sm={8}>{row.note}</Col>
        <Col sm={2} />
    </Row>
}

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
};