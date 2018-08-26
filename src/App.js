import React, { Component } from 'react';
import { Modal } from 'antd';
import { Subscribe } from 'unstated';

import Header from './components/Header';
import Aside from './components/Aside';
import Viewer from './components/Viewer';
import Location from './components/Location';
import TrashBin from './components/TrashBin';
import DataContainer from './state/DataContainer';

class App extends Component {
  state = {
    modalOpen: false,
  };

  showModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <div className="app">
        <Header showModal={this.showModal} />
        <main>
          <Aside />
          <section>
            <Location />
            <Viewer />
          </section>
        </main>
        <Subscribe to={[DataContainer]}>
          {({ state: { trash }, emptyTrash, restoreNode, removeFromTrash }) => {
            return (
              <Modal
                visible={this.state.modalOpen}
                title="Trash Bin"
                okText="Empty Bin"
                onOk={() => {
                  emptyTrash();
                  this.closeModal();
                }}
                cancelText="Close"
                onCancel={this.closeModal}
              >
                <TrashBin trash={trash} restoreNode={restoreNode} removeFromTrash={removeFromTrash} />
              </Modal>
            );
          }}
        </Subscribe>
      </div>
    );
  }
}

export default App;
