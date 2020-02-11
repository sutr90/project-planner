import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col, InputNumber, Input, Select, Button, Form } from 'antd';
import {addRow} from './store/rowsSlice'
import { connect } from 'react-redux';

const { Option } = Select;

import './Table.scss'

const NewTableRow = (props) => {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.addRow({ id: rowId, ...values, editable: false });
                props.form.resetFields();
            }
        });
    };

    const { rowId } = props;
    const { getFieldDecorator } = props.form;

    const opts = props.options.map(option => <Option key={option.id} value={option.id} label={option.name}>{option.name}</Option>);

    return <Row className="table-row" onSubmit={handleSubmit}>
        <Form>
            <Col sm={1} offset={1}>{rowId}</Col>
            <Col sm={4}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Required value!' }],
                    })(<Input />)}
                </Form.Item>
            </Col>
            <Col sm={2}>
                <Form.Item>
                    {getFieldDecorator('cost', {
                        rules: [{ required: true, message: 'Required value!' }],
                    })(<InputNumber min={0} />)}
                </Form.Item>
            </Col>
            <Col sm={6}>
                <Form.Item>
                    {getFieldDecorator('deps', {
                        rules: [{ required: true, message: 'Required value!' }],
                    })
                        (<Select mode="multiple"
                            style={{ width: '100%' }}
                            tokenSeparators={[',']}
                            filterOption={(input, option) => option.props.value === Number(input) || option.props.label.startsWith(input)}
                            hide>
                            {opts}
                        </Select>)}
                </Form.Item>
            </Col>
            <Col sm={8}>
                <Form.Item>
                    {getFieldDecorator('note', {
                        rules: [{ required: true, message: 'Required value!' }],
                    })
                        (<Input />)}
                </Form.Item>
            </Col>
            <Col sm={2}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add row</Button>
                </Form.Item>
            </Col>
        </Form>
    </Row>
}

const formObj = Form.create({ name: 'new_row_form' })(NewTableRow);

NewTableRow.propTypes = {
    rowId: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired,
};


const mapDispatch = { addRow }
export default connect(null, mapDispatch)(formObj);