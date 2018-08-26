import React, { Component } from 'react';
import { Divider } from 'antd';

import FileTree from './FileTree';
import Actions from './Actions';

class Aside extends Component {
  render() {
    return (
      <aside>
        <Actions />
        <Divider type="horizontal" />
        <h3 className="aside-title">File Explorer</h3>
        <FileTree />
      </aside>
    );
  }
}

export default Aside;
