import React, { Component } from 'react';
import { Icon, Button, Input } from 'antd';
import { Subscribe } from 'unstated';

import DataContainer from '../state/DataContainer';

class Actions extends Component {
  state = {
    editing: false,
    adding: false,
  };

  startAdding = () => {
    this.setState({ adding: true });
  };

  endAdding = () => {
    this.setState({ adding: false });
  };

  startEditing = () => {
    this.setState({ editing: true });
  };

  endEditing = () => {
    this.setState({ editing: false });
  };

  render() {
    return (
      <Subscribe to={[DataContainer]}>
        {({ state: { subtree }, deleteNode, editNode, addNode }) => {
          return (
            <div className="actions-container">
              <Button.Group>
                <Button type="primary" onClick={() => !!subtree && this.startAdding()}>
                  <Icon type="plus" />
                  Add
                </Button>
                <Button type="dashed" onClick={() => !!subtree && this.startEditing()}>
                  <Icon type="edit" />
                  Edit
                </Button>
                <Button type="danger" onClick={() => !!subtree && deleteNode(subtree.key)}>
                  <Icon type="minus" />
                  Delete
                </Button>
              </Button.Group>
              <div className="form">
                {this.state.adding && (
                  <Input.Search
                    placeholder="Untitled"
                    enterButton="Add"
                    onSearch={value => {
                      this.endAdding();
                      addNode(subtree.key, value || 'Untitled');
                    }}
                  />
                )}

                {this.state.editing && (
                  <Input.Search
                    defaultValue={subtree.name}
                    enterButton="Edit"
                    onSearch={value => {
                      this.endEditing();
                      editNode(subtree.key, value || 'Untitled');
                    }}
                  />
                )}
              </div>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}

export default Actions;
