import React, { useState, useCallback } from "react";
import Tree, { treeUtil } from "react-d3-tree";
import { Empty } from 'antd';

import { connect } from 'react-redux'
const debugData = [{
  "parent": "CSVNode1",
  "child": "CSVNode2",
  "attA": "22",
  "attB": "someValue"
}, {
  "parent": "CSVNode1",
  "child": "CSVNode3",
  "attA": "23",
  "attB": "someValue"
}, {
  "parent": "CSVNode2",
  "child": "CSVNode4",
  "attA": "1",
  "attB": "someValue"
}, {
  "parent": "CSVNode2",
  "child": "CSVNode5",
  "attA": "2",
  "attB": "someValue"
}, {
  "parent": "CSVNode2",
  "child": "CSVNode6",
  "attA": "3",
  "attB": "someValue"
}, {
  "parent": "CSVNode2",
  "child": "CSVNode7",
  "attA": "4",
  "attB": "someValue"
}, {
  "parent": "CSVNode2",
  "child": "CSVNode8",
  "attA": "5",
  "attB": "someValue"
}, {
  "parent": "CSVNode2",
  "child": "CSVNode9",
  "attA": "6",
  "attB": "someValue"
}, {
  "parent": "CSVNode2",
  "child": "CSVNode10",
  "attA": "7",
  "attB": "someValue"
}, {
  "parent": "CSVNode4",
  "child": "CSVNode11",
  "attA": "8",
  "attB": "someValue"
}, {
  "parent": "CSVNode7",
  "child": "CSVNode12",
  "attA": "9",
  "attB": "someValue"
}, {
  "parent": "CSVNode9",
  "child": "CSVNode13",
  "attA": "10",
  "attB": "someValue"
}, {
  "parent": "CSVNode10",
  "child": "CSVNode14",
  "attA": "11",
  "attB": "someValue"
}, {
  "parent": "CSVNode11",
  "child": "CSVNode15",
  "attA": "12",
  "attB": "someValue"
}, {
  "parent": "CSVNode3",
  "child": "CSVNode16",
  "attA": "13",
  "attB": "someValue"
}, {
  "parent": "CSVNode16",
  "child": "CSVNode17",
  "attA": "14",
  "attB": "someValue"
}, {
  "parent": "CSVNode16",
  "child": "CSVNode18",
  "attA": "15",
  "attB": "someValue"
}, {
  "parent": "CSVNode16",
  "child": "CSVNode19",
  "attA": "16",
  "attB": "someValue"
}, {
  "parent": "CSVNode16",
  "child": "CSVNode20",
  "attA": "17",
  "attB": "someValue"
}, {
  "parent": "CSVNode17",
  "child": "CSVNode21",
  "attA": "18",
  "attB": "someValue"
}, {
  "parent": "CSVNode18",
  "child": "CSVNode22",
  "attA": "19",
  "attB": "someValue"
}, {
  "parent": "CSVNode19",
  "child": "CSVNode23",
  "attA": "20",
  "attB": "someValue"
}, {
  "parent": "CSVNode20",
  "child": "CSVNode24",
  "attA": "21",
  "attB": "someValue"
}];

const containerStyles = {
  width: '100%',
  height: '90vh',
  overflow: 'hidden'
}



function _transformToHierarchy(links, attributeFields) {
  const nodesByName = {};

  const assignNode = link => {
    if (!nodesByName[link.parent]) {
      nodesByName[link.parent] = { rowId: link.parent, name: link.name };
    }
    return nodesByName[link.parent];
  };

  const assignNodeWithAttributes = (link, attributes) => {
    if (!nodesByName[link.child]) {
      nodesByName[link.child] = {
        rowId: link.child,
        name: link.name,
        attributes,
      };
    }
    return nodesByName[link.child];
  };

  // Create nodes for each unique source and target.
  links.forEach(link => {
    // if `attributeFields` is defined, create/overwrite current `link.attributes`
    if (attributeFields) {
      const customAttributes = {};
      attributeFields.forEach(field => {
        customAttributes[field] = link[field];
      });
      link.attributes = customAttributes;
    }

    link.source = assignNode(link);
    link.target = assignNodeWithAttributes(link, link.attributes);
    const parent = link.source;
    const child = link.target;

    parent.id = Math.random();
    child.id = Math.random();
    child.parent = parent.name || null;

    parent._collapsed = child._collapsed = false; // eslint-disable-line
    // NOTE We assign to a custom `_children` field instead of D3's reserved
    // `children` to avoid update anomalies when collapsing/re-expanding nodes.
    parent._children ? parent._children.push(child) : (parent._children = [child]);
  });

  // Extract & return the root node
  const rootLinks = links.filter(link => !link.source.parent);
  return [rootLinks[0].source];
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

  const rowsToData = () => {

    const getRowById = (id) => {
      return props.rows.filter(row => row.id === id);
    };


    const data = [];
    props.rows.forEach(row => {
      row.deps.forEach(dep => {
        const parent = getRowById(dep);
        data.push({ parent: dep, child: row.id, name: row.name })
      });
    });

    return data;
  };


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

  // const data = _transformToHierarchy(rowsToData());
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