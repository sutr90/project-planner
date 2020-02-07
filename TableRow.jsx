import React from 'react'
import { Row, Col, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import './Table.scss'

export default function TableRow(props) {
    const { row } = props;

    return <Row className="table-row">
        <Col sm={1} offset={1}>{row.id}</Col>
        <Col sm={4}>{row.name}</Col>
        <Col sm={2}>{row.cost}</Col>
        <Col sm={6}>{row.deps.join(",")}</Col>
        <Col sm={8}>{row.note}</Col>
        <Col sm={2}><Button onClick={() => props.onEdit(row.id)} ><Icon type="edit" /></Button><Button onClick={() => props.onDelete(row.id)}> <Icon type="delete" /></Button></Col>
    </Row >
}

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};