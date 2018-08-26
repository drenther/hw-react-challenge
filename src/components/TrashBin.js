import React, { Component } from 'react';
import { Card, Button, Alert } from 'antd';

class TrashBin extends Component {
  render() {
    const { trash, removeFromTrash, restoreNode } = this.props;
    return (
      <div className="trash-bin">
        {trash.length ? (
          trash.map(({ node, parent }, index) => (
            <Card
              hoverable
              className="trash-items"
              key={node.key}
              actions={[
                <Button size="small" onClick={() => restoreNode(index)}>
                  Restore
                </Button>,
                <Button size="small" onClick={() => removeFromTrash(index)}>
                  Remove
                </Button>,
              ]}
            >
              <Card.Meta title={node.name} description={`Parent - ${parent.name}`} />
            </Card>
          ))
        ) : (
          <div className="msg">
            <Alert message="It's empty" type="warning" />
          </div>
        )}
      </div>
    );
  }
}

export default TrashBin;
