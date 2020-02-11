import React from 'react'
import PropTypes from 'prop-types';
import {addRow} from './store/rowsSlice'
import {connect} from 'react-redux';

import './Table.scss'
import RowForm from "./RowForm";

const NewTableRow = (props) => {
    const handleSubmit = values => {
        props.addRow({id: rowId, ...values, editable: false});
    };

    const {rowId} = props;

    return <RowForm rowId={rowId} onSubmit={handleSubmit}/>
};

NewTableRow.propTypes = {
    rowId: PropTypes.number.isRequired
};


const mapDispatch = {addRow};
export default connect(null, mapDispatch)(NewTableRow);