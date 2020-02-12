import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col, InputNumber, Input, Select, Button, Form } from 'antd';
import { addRow } from './store/rowsSlice'
import { connect } from 'react-redux';

const { Option } = Select;

import './Table.scss'
import { getRowOptions } from "./store/selector";

const RowForm = (props) => {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.onSubmit(values);
                props.form.resetFields();
            }
        });
    };

    const { rowId } = props;
    const { getFieldDecorator } = props.form;

    const opts = props.rowOptions.map(option => <Option key={option.id} value={option.id}
        label={option.name}>{option.name}</Option>);

    return <Row className="table-row" onSubmit={handleSubmit}>
        <Form>
            <Col sm={1} offset={1}>{rowId}</Col>
            <Col sm={4}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        initialValue: props.init && props.init.name,
                        rules: [{ required: true, message: 'Required value!' }],
                    })(<Input />)}
                </Form.Item>
            </Col>
            <Col sm={2}>
                <Form.Item>
                    {getFieldDecorator('cost', {
                        initialValue: props.init && props.init.cost,
                        rules: [{ required: true, message: 'Required value!' }],
                    })(<InputNumber min={0} />)}
                </Form.Item>
            </Col>
            <Col sm={6}>
                <Form.Item>
                    {getFieldDecorator('deps', {
                        initialValue: props.init && props.init.deps
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
                        initialValue: props.init && props.init.note
                    })
                        (<Input />)}
                </Form.Item>
            </Col>
            <Col sm={2}>
                <Form.Item>
                    {props.buttons}
                </Form.Item>
            </Col>
        </Form>
    </Row>
};

const formObj = Form.create({ name: 'row_form' })(RowForm);

RowForm.propTypes = {
    rowId: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    init: PropTypes.object,
};


const mapDispatch = { addRow };

const mapState = (state) => {
    return {
        rowOptions: getRowOptions(state.rows),
    }
};

export default connect(mapState, mapDispatch)(formObj);