import React, { useState, useCallback } from "react";
import Tree, { treeUtil } from "react-d3-tree";
import { Empty } from 'antd';

import { connect } from 'react-redux'

const containerStyles = {
  width: '100%',
  height: '90vh',
  overflow: 'hidden'
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

const CenteredTree = props => {
  const [rect, ref] = useClientRect();

  const getTranslate = () => {
    if (rect) {
      return {
        x: rect.width / 2,
        y: rect.height / 2
      }
    }

    return { x: 0, y: 0 };
  }

  const rowsToHierarchy = () => {
    const rowToNode = row => {
      return {
        rowId: row.id,
        name: row.name,
        attributes: undefined,
        children: []
      };
    };

    const getNodeByRowId = (id) => {
      return nodes.filter(node => node.rowId === id)[0];
    };

    const { rows } = props;

    const nodes = rows.map(row => rowToNode(row));

    rows.forEach(row => {
      row.deps.forEach(dep => {
        const parent = getNodeByRowId(dep);
        parent.children.push({ ...getNodeByRowId(row.id) });
      });
    });

    return nodes[0];
  };


  if (props.rows.length <= 1) {
    return <Empty />;
  }

  const data = rowsToHierarchy();
  console.log(rowsToHierarchy());
  return <div style={containerStyles} ref={ref}>
    <Tree
      data={data}
      translate={getTranslate()}
      orientation={'vertical'}
    />
  </div>
}


const mapStateToProps = state => {
  return {
    rows: state.rows,
  }
}

export default connect(mapStateToProps)(CenteredTree);