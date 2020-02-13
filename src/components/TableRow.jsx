import React from 'react'
import { Row, Col, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import './Table.scss'
import { deleteRow, toggleRowEditable, updateRow } from '../store/rowsSlice'
import { connect } from 'react-redux';
import RowForm from "./RowForm";

const TableRow = (props) => {
    const { row } = props;

    const handleUpdate = values => {
        props.updateRow({ id: row.id, ...values, editable: false });
    };

    if (row.editable) {
        const buttons = <><Button type="primary" htmlType="submit"><Icon type="save" /></Button>
            <Button onClick={() => props.toggleRowEditable({ id: row.id })}><Icon type="close-circle" /></Button></>

        return <RowForm rowId={row.id} onSubmit={handleUpdate} init={row} buttons={buttons} />
    }

    return <Row className="table-row">
        <Col sm={1} offset={1}>{row.id}</Col>
        <Col sm={8}>{row.name}</Col>
        <Col sm={2} style={{textAlign: "right"}}>{row.cost}</Col>
        <Col sm={6} style={{textAlign: "right"}}>{row.deps.join(",")}</Col>
        <Col sm={4}>{row.note}</Col>
        <Col sm={2}>
            {!row.locked && <>
                <Button onClick={() => props.toggleRowEditable({ id: row.id })}><Icon type="edit" /></Button>
                <Button onClick={() => props.deleteRow(row.id)}><Icon type="delete" /></Button>
            </>
            }
        </Col>
    </Row>
};

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
};

const mapDispatch = { deleteRow, toggleRowEditable, updateRow };
export default connect(null, mapDispatch)(TableRow);