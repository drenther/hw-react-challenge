import React, { Component } from 'react';
import { Tree } from 'antd';
import { Subscribe } from 'unstated';

import DataContainer from '../state/DataContainer';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

const recursiveRender = node => {
  if (node.children) {
    return (
      <TreeNode title={node.name} key={node.key}>
        {node.children.map(n => recursiveRender(n))}
      </TreeNode>
    );
  } else {
    return <TreeNode title={node.name} key={node.key} isLeaf={node.children === undefined ? true : false} />;
  }
};

class FileTree extends Component {
  render() {
    return (
      <div className="file-tree">
        <Subscribe to={[DataContainer]}>
          {({ state: { data }, selectSubtree }) => {
            const JSX = recursiveRender(data);

            return (
              <DirectoryTree draggable showIcon onSelect={selectSubtree}>
                {JSX}
              </DirectoryTree>
            );
          }}
        </Subscribe>
      </div>
    );
  }
}

export default FileTree;
