import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Table, Alert } from 'antd';

import DataContainer from '../state/DataContainer';

class Viewer extends Component {
  render() {
    return (
      <div className="viewer">
        <Subscribe to={[DataContainer]}>
          {({ state: { subtree }, selectSubtree }) => {
            if (!subtree)
              return (
                <div className="msg">
                  <Alert message="Nothing is selected!" type="warning" />
                </div>
              );
            if (!subtree.children && subtree.name.includes('.'))
              return (
                <div className="msg">
                  <Alert
                    message={subtree.name}
                    description={`This is a ${subtree.name.split('.').pop()} file`}
                    type="warning"
                  />
                  ;
                </div>
              );

            const columns = [
              {
                key: 'name',
                title: 'Name',
                dataIndex: 'name',
              },
              {
                key: 'type',
                title: 'Type',
                dataIndex: 'type',
              },
            ];
            const dataSource = subtree.children.map(({ name, key, children }) => {
              if (children) {
                return { name, type: 'Folder', key };
              } else {
                return { name, type: `${name.split('.').pop()} file`, key };
              }
            });
            return (
              <Table
                pagination={false}
                dataSource={dataSource}
                columns={columns}
                onRow={record => {
                  return {
                    style: { cursor: 'pointer' },
                    onClick: () => {
                      selectSubtree([record.key]);
                    },
                  };
                }}
              />
            );
          }}
        </Subscribe>
      </div>
    );
  }
}

export default Viewer;
