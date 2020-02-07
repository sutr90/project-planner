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

    const rowsToOptions = rowValues => {
        return rowValues.map(row => { return { id: row.id, name: row.name }; });
    };

    const [rows, setRows] = useState(initialRows);
    const [options, setOptions] = useState(() => rowsToOptions(initialRows()))

    useEffect(() => {
        window.localStorage.setItem('rows', JSON.stringify(rows));

    }, [rows]);

    const addRow = (rowValues) => {
        setRows([...rows, rowValues]);
        setOptions([...options, ...rowsToOptions([rowValues])]);
    };

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
        <NewTableRow rowId={rows.length} options={options} onAdd={addRow} />
    </>
}