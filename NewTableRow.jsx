import React from 'react'
import { addRow } from './store/rowsSlice'
import { connect } from 'react-redux';

import './Table.scss'
import RowForm from "./RowForm";

const NewTableRow = (props) => {
    const handleSubmit = values => {
        props.addRow({ id: rowId, ...values, editable: false });
    };

    const { rowId } = props;

    return <RowForm rowId={rowId} onSubmit={handleSubmit} />
};

const mapDispatch = { addRow };

const mapState = (state) => {
    return { rowId: 1 + (state.rows.reduce((a, b) => Math.max(a.id, b.id))) };
};

export default connect(mapState, mapDispatch)(NewTableRow);