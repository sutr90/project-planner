import React, { useEffect } from 'react'
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import TableRow from './TableRow'
import NewTableRow from './NewTableRow'
import './Table.scss'

const Table = (props) => {
    const { rows } = props;

    useEffect(() => {
        window.localStorage.setItem('rows', JSON.stringify(rows));
    }, [rows]);

    const renderHeader = () => {
        return <Row className="table-header" gutter={8}>
            <Col sm={1} offset={1}>ID</Col>
            <Col sm={8}>Name</Col>
            <Col sm={2} style={{ textAlign: "right" }}>Cost</Col>
            <Col sm={6} style={{ textAlign: "right" }}>Dependencies</Col>
            <Col sm={4}>Note</Col>
            <Col sm={2} />
        </Row>
    };

    const renderRows = () => {
        return rows.map((row, index) => <TableRow key={`table-row-${index}`} row={row} />);
    };

    return <>
        {renderHeader()}
        {renderRows()}
        <NewTableRow />
    </>
}

const mapStateToProps = state => {
    return {
        rows: state.rows,
    }
}

export default connect(mapStateToProps)(Table);