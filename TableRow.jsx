import React from 'react'
import { Row, Col, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import './Table.scss'
import { deleteRow } from './store/rowsSlice'
import { connect } from 'react-redux';

const TableRow = (props) => {
    const { row } = props;

    return <Row className="table-row">
        <Col sm={1} offset={1}>{row.id}</Col>
        <Col sm={4}>{row.name}</Col>
        <Col sm={2}>{row.cost}</Col>
        <Col sm={6}>{row.deps.join(",")}</Col>
        <Col sm={8}>{row.note}</Col>
        <Col sm={2}>
            {!row.locked && <>
                <Button onClick={() => console.log("edit")} ><Icon type="edit" /></Button>
                <Button onClick={() => props.deleteRow(row.id)}> <Icon type="delete" /></Button>
            </>
            }
        </Col>
    </Row >
}

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
};

const mapDispatch = { deleteRow }
export default connect(null, mapDispatch)(TableRow);