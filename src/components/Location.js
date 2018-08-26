import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Subscribe } from 'unstated';

import DataContainer from '../state/DataContainer';

class Location extends Component {
  render() {
    return (
      <Subscribe to={[DataContainer]}>
        {({ state: { trail }, selectSubtree }) => {
          return (
            <div className="location">
              <Breadcrumb separator="/" style={{ margin: '0px 10px' }}>
                {trail.map(({ name, key }) => (
                  <Breadcrumb.Item key={key}>
                    <span style={{ cursor: 'pointer' }} onClick={() => selectSubtree([key])}>
                      {name}
                    </span>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}

export default Location;
