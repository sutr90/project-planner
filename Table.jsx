import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import TableRow from './TableRow'
import NewTableRow from './NewTableRow'
import './Table.scss'

const Table = (props) => {
    const {rows} = props;

    useEffect(() => {
        window.localStorage.setItem('rows', JSON.stringify(rows));
    }, [rows]);

    const renderHeader = () => {
        return <Row className="table-header" gutter={8}>
            <Col sm={1} offset={1}>ID</Col>
            <Col sm={4}>Name</Col>
            <Col sm={2}>Cost</Col>
            <Col sm={6}>Dependencies</Col>
            <Col sm={8}>Note</Col>
            <Col sm={2} />
        </Row>
    };

    const renderRows = () => {
        return rows.map((row, index) => <TableRow key={`table-row-${index}`} row={row} />);
    };

    return <>
        {renderHeader()}
        {renderRows()}
        <NewTableRow rowId={rows.length} />
    </>
}

const mapStateToProps = state => {
    return {
        rows: state.rows,
    }
}

export default connect(mapStateToProps)(Table);