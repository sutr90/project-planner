import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Empty } from 'antd'
import { connect } from 'react-redux'

const cytograph = (props) => {
    const { rows } = props;

    const rowsToHierarchy = () => {
        const rowToNode = row => {
            return [{ data: { id: row.id, label: `[${row.id}] ${row.name} (${row.cost})` } }, ...rowToEdge(row)];
        };

        const rowToEdge = row => {
            return row.deps.map(dep => {
                return { data: { source: dep, target: row.id} }
            });
        };

        return [...rows.map(row => rowToNode(row))].flat();
    };


    if (props.rows && props.rows.length <= 1) {
        return <Empty />;
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

    return <CytoscapeComponent elements={[...rowsToHierarchy()]}
        wheelSensitivity={0.1}
        style={{
            width: '100%',
            height: '90vh',
            overflow: 'hidden'
        }}
        layout={{
            name: 'breadthfirst',
            directed: true,
            padding: 30
        }}

        stylesheet={[{
            selector: 'edge',
            style: {
                'curve-style': 'taxi',
                'taxi-direction': 'downward',
                'width': 1,
                'target-arrow-shape': 'vee',
                'line-color': '#000',
                'target-arrow-color': '#000'
            }
        },
        {
            "selector": "node",
            "style": {
                "shape": "round-rectangle",
                "content": "data(label)",
                "font-size": "12px",
                "font-family": "sans-serif",
                "width": "label",
                "height": "label",
                "padding": "8px",
                "text-valign": "center",
                "text-halign": "center",
                "text-wrap": "wrap",
                "text-max-width": 100,
                "color": "#000",
                "background-color": "#fff",
                "border-color": "#000",
                "border-style": "solid",
                "border-width": "1px"
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