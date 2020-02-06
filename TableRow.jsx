import React from 'react'
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import './Table.scss'

export default class TableRow extends React.Component {
    render() {
        const { row } = this.props;

        return <Row className="table-row" type="flex" justify="space-around">
            <Col span={2}>{row.id}</Col>
            <Col span={4}>{row.name}</Col>
            <Col span={2}>{row.cost}</Col>
            <Col span={6}>{row.deps}</Col>
            <Col span={8}>{row.note}</Col>
            <Col span={2}></Col>
        </Row>
    }
}

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
};