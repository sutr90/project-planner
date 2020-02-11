import React from 'react'
import PropTypes from 'prop-types';
import {Row, Col, InputNumber, Input, Select, Button, Form} from 'antd';
import {addRow} from './store/rowsSlice'
import {connect} from 'react-redux';

const {Option} = Select;

import './Table.scss'
import RowForm from "./RowForm";

const NewTableRow = (props) => {
    const handleSubmit = values => {
        props.addRow({id: rowId, ...values, editable: false});
    };

    const {rowId} = props;

    return <RowForm options={props.options} rowId={rowId} onSubmit={handleSubmit}/>
};

const formObj = Form.create({name: 'new_row_form'})(NewTableRow);

NewTableRow.propTypes = {
    rowId: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired,
};


const mapDispatch = {addRow};
export default connect(null, mapDispatch)(formObj);