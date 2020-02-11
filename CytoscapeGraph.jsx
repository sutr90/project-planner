import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import {Empty} from 'antd'
import {connect} from 'react-redux'

const cytograph = (props) => {
    const rowsToHierarchy = () => {
        const rowToNode = row => {
            return [{data: {id: row.id, label: row.name}}, ...rowToEdge(row)];
        };

        const rowToEdge = row => {
            return row.deps.map(dep => {
                return {data: {source: dep, target: row.id}}
            });
        };

        const {rows} = props;

        return [...rows.map(row => rowToNode(row))].flat();
    };


    if (props.rows && props.rows.length <= 1) {
        return <Empty/>;
    }

    const handleCy = (cy) => {
        cy.on('add remove', () => {
            cy.layout({
                name: 'breadthfirst',
                directed: true,
                padding: 10
            }).run();
        });
    };

    console.log(rowsToHierarchy());

    return <CytoscapeComponent elements={[...rowsToHierarchy()]} style={{
        width: '100%',
        height: '90vh',
        overflow: 'hidden'
    }}
                               layout={{
                                   name: 'breadthfirst',
                                   directed: true,
                                   padding: 10
                               }}

                               stylesheet={[{
                                   selector: 'edge',
                                   style: {
                                       'curve-style': 'bezier',
                                       'width': 6,
                                       'target-arrow-shape': 'triangle',
                                       'line-color': '#ffaaaa',
                                       'target-arrow-color': '#ffaaaa'
                                   }
                               },
                                   {
                                       "selector": "node",
                                       "style": {
                                           "content": "data(label)",
                                           "font-size": "12px",
                                           "text-valign": "center",
                                           "text-halign": "center",
                                           "color": "#fff",
                                       }
                                   }
                               ]}

                               cy={handleCy}

    />;
};

const mapStateToProps = state => {
    return {
        rows: state.rows,
    }
};

export default connect(mapStateToProps)(cytograph);