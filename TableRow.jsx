import React from 'react'
import {Row, Col, Button, Icon} from 'antd';
import PropTypes from 'prop-types';
import './Table.scss'
import {deleteRow, toggleRowEditable} from './store/rowsSlice'
import {connect} from 'react-redux';

const TableRow = (props) => {
    const {row} = props;

    const rowButton = row.editable ?
        <Button onClick={() => {alert("save"); props.toggleRowEditable({id: row.id});}}><Icon type="save"/></Button>
        : <Button onClick={() => props.toggleRowEditable({id: row.id})}><Icon type="edit"/></Button>;

    return <Row className="table-row">
        <Col sm={1} offset={1}>{row.id}</Col>
        <Col sm={4}>{row.name}</Col>
        <Col sm={2}>{row.cost}</Col>
        <Col sm={6}>{row.deps.join(",")}</Col>
        <Col sm={8}>{row.note}</Col>
        <Col sm={2}>
            {!row.locked && <>
                {rowButton}
                <Button onClick={() => props.deleteRow(row.id)}><Icon type="delete"/></Button>
            </>
            }
        </Col>
    </Row>
};

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
};

const mapDispatch = {deleteRow, toggleRowEditable};
export default connect(null, mapDispatch)(TableRow);