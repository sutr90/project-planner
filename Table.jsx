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
        return <Row className="table-header" type="flex" justify="space-around">
            <Col span={2}>ID</Col>
            <Col span={4}>Name</Col>
            <Col span={2}>Cost</Col>
            <Col span={6}>Dependencies</Col>
            <Col span={8}>Note</Col>
            <Col span={2}></Col>
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
            <NewTableRow rowId={0} onAdd={()=>{}}/>
        </>
    }
}