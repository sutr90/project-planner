import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd';

import TableRow from './TableRow'
import NewTableRow from './NewTableRow'
import './Table.scss'

export default function Table() {

    const initialRows = () => JSON.parse(window.localStorage.getItem('rows')) || [{
        id: 0,
        name: "start",
        cost: 0,
        deps: [],
        note: ""
    }];

    const [rows, setRows] = useState(initialRows);

    useEffect(() => window.localStorage.setItem('rows', JSON.stringify(rows)), [rows]);

    const addRow = (rowValues) => {
        setRows([...rows, rowValues]);
    };

    const renderHeader = () => {
        return <Row className="table-header" gutter={8}>
            <Col sm={2}>ID</Col>
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
        <NewTableRow rowId={0} onAdd={(e) => {
            addRow(e);
        }} />
    </>
}