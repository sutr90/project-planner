import React from 'react'
import PropTypes from 'prop-types';
import {Row, Col, InputNumber, Input, Select, Button, Form} from 'antd';

const {Option} = Select;

import './Table.scss'

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class NewTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {rowId} = this.props;

        return <Row className="table-row" gutter={8}>
            <Col sm={2}>{rowId}</Col>
            <Col sm={4}>
                <Form.Item>
                    <Input/></Form.Item>
            </Col>
            <Col sm={2}>
                <Form.Item>
                    <InputNumber/>
                </Form.Item>
            </Col>
            <Col sm={6}>
                <Form.Item>
                    <Select mode="multiple" style={{width: '100%'}} placeholder="Please select" tokenSeparators={[',']}>
                        {children}
                    </Select>
                </Form.Item>
            </Col>
            <Col sm={8}>
                <Form.Item>
                    <Input/>
                </Form.Item>
            </Col>
            <Col sm={2}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add row</Button>
                </Form.Item>
            </Col>
        </Row>
    }
}

export default Form.create({name: 'new_row_form'})(NewTableRow);

NewTableRow.propTypes = {
    rowId: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired
};