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
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { rowId } = this.props;

        return <Row className="table-row" type="flex" justify="space-around">
            <Col span={2}>{rowId}</Col>
<<<<<<< HEAD
            <Col span={4}><Input onChange={(e) => this.setState({name: e.target.value})}/></Col>
=======
            <Col span={4}><Input onChange={(value) => this.setState({name: value})}/></Col>
>>>>>>> 3cdfd78e2ab0e69970e32c0446aae1aa923ac53a
            <Col span={2}><InputNumber min={0} onChange={(value) => this.setState({cost: value})}/></Col>
            <Col span={6}>
                <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select" onChange={(value) => this.setState({deps: value})} tokenSeparators={[',']}>
                    {children}
                </Select>
            </Col>
<<<<<<< HEAD
            <Col span={8}><Input onChange={(e) => this.setState({note: e.target.value})}/></Col>
=======
            <Col span={8}><Input onChange={(value) => this.setState({note: value})}/></Col>
>>>>>>> 3cdfd78e2ab0e69970e32c0446aae1aa923ac53a
            <Col span={2}><Button onClick={(value) => this.props.onAdd(this.state)}>Add row</Button></Col>
        </Row>
    }
}

NewTableRow.propTypes = {
    rowId: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired
};