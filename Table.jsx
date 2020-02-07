import React from 'react'
import { Row, Col } from 'antd';

import TableRow from './TableRow'
import NewTableRow from './NewTableRow'
import './Table.scss'

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: [{
                id: 0,
                name: "start",
                cost: 0,
                deps: [],
                note: ""
            }]
        }
    }

    renderHeader = () => {
        return <Row className="table-header" gutter={8}>
            <Col sm={2}>ID</Col>
            <Col sm={4}>Name</Col>
            <Col sm={2}>Cost</Col>
            <Col sm={6}>Dependencies</Col>
            <Col sm={8}>Note</Col>
            <Col sm={2}/>
        </Row>
    };

    renderRows = () => {
        const { rows } = this.state;

        return rows.map((row, index) => <TableRow key={`table-row-${index}`} row={row} />);
    };

    render() {
        return <>
            {this.renderHeader()}
            {this.renderRows()}
            <NewTableRow rowId={0} onAdd={(e) => { console.log(e) }} />
        </>
    }
}