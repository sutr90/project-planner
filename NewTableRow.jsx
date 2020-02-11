import React from 'react'
import { addRow } from './store/rowsSlice'
import { connect } from 'react-redux';
import { Button } from 'antd';

import './Table.scss'
import RowForm from "./RowForm";

const NewTableRow = (props) => {
    const handleSubmit = values => {
        props.addRow({ id: rowId, ...values, editable: false });
    };

    const { rowId } = props;

    const buttons = <Button type="primary" htmlType="submit">Add row</Button>;

    return <RowForm rowId={rowId} onSubmit={handleSubmit} buttons={buttons}/>
};

const mapDispatch = { addRow };

const mapState = (state) => {
    return { rowId: 1 + Math.max(...state.rows.map(r => r.id)) };
};

export default connect(mapState, mapDispatch)(NewTableRow);