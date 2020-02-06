import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col, InputNumber, Input, Select, Button } from 'antd';

const { Option } = Select;

import './Table.scss'

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default class NewTableRow extends React.Component {

    handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    render() {
        const { rowId } = this.props;

        return <Row className="table-row" type="flex" justify="space-around">
            <Col span={2}>{rowId}</Col>
            <Col span={4}><Input /></Col>
            <Col span={2}><InputNumber min={0} /></Col>
            <Col span={6}>
                <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select" onChange={this.handleChange} tokenSeparators={[',']}>
                    {children}
                </Select>
            </Col>
            <Col span={8}><Input /></Col>
            <Col span={2}><Button>Add row</Button></Col>
        </Row>
    }
}

NewTableRow.propTypes = {
    rowId: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired
};