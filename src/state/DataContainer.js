import { Container } from 'unstated';
import { message } from 'antd';
import TreeModel from 'tree-model';

import { longJson, shortJson } from '../data';
import { loadFromLS, saveToLS, parseInitialRawData, getId } from '../utils';

class DataContainer extends Container {
  constructor(props) {
    super(props);
    this.longData = loadFromLS('long-data');
    this.shortData = loadFromLS('short-data');

    if (!this.longData) {
      this.longData = parseInitialRawData(longJson);
      saveToLS('long-data', this.longData);
    }

    if (!this.shortData) {
      this.shortData = parseInitialRawData(shortJson);
      saveToLS('short-data', this.shortData);
    }

    this.state = {
      data: this.shortData,
      current: 'short-data',
      subtree: null,
      selected: null,
      trail: [],
      trash: [],
      draggingKey: null,
    };
  }

  setLongAsCurrent = () => {
    this.setState({ data: this.longData, current: 'short-data' });
  };

  setShortAsCurrent = () => {
    this.setState({ data: this.shortData, current: 'long-data' });
  };

  syncToStorage = () => {
    saveToLS(this.state.current, this.state.data);
  };

  selectSubtree = keys => {
    this.setState(prevState => {
      const tree = new TreeModel();
      const root = tree.parse(prevState.data);
      const res = root.first(node => node.model.key === keys[0]);
      const subtree = res.model;
      const trail = res.getPath().map(({ model: { name, key } }) => ({ name, key }));
      return { subtree, trail };
    });
  };

  resetSubtree = () => {
    this.setState({ subtree: null, trail: [] });
  };

  deleteNode = key => {
    this.setState(prevState => {
      const tree = new TreeModel();
      const root = tree.parse(prevState.data);
      const res = root.first(node => node.model.key === key);
      const trail = res.getPath();
      const parent = trail[trail.length - 2 > 0 ? trail.length - 2 : 0];
      console.log(parent);
      const deleted = res.drop();
      message.success('Deleted');
      const trash = [...prevState.trash, { node: deleted.model, parent: parent.model }];
      return { data: Object.assign({}, root.model), subtree: null, trail: [], trash };
    });
  };

  editNode = (key, name) => {
    this.setState(prevState => {
      const tree = new TreeModel();
      const root = tree.parse(prevState.data);
      const res = root.first(node => node.model.key === key);
      res.model.name = name;
      message.success('Modified');
      return { data: Object.assign({}, root.model) };
    });
  };

  addNode = (key, name) => {
    this.setState(prevState => {
      const tree = new TreeModel();
      const root = tree.parse(prevState.data);
      const res = root.first(node => node.model.key === key);
      if (res.model.name.includes('.')) {
        message.error('Files cannot contain other files.');
        return null;
      }
      const newNode = tree.parse({ key: getId(), name });
      if (!name.includes('.')) newNode.model.children = [];
      res.addChild(newNode);
      message.success('Added');
      return { data: Object.assign({}, root.model) };
    });
  };

  dropNode = ({ dragNode, node }) => {
    this.setState(prevState => {
      const dragged = dragNode.props;
      const dropped = node.props;
      if (dropped.title.includes('.')) {
        message.error('Files cannot contain other files.');
        return null;
      }

      const tree = new TreeModel();
      const root = tree.parse(prevState.data);
      const resDrag = root.first(node => node.model.key === dragged.eventKey);
      const resDrop = root.first(node => node.model.key === dropped.eventKey);
      const newNode = tree.parse(resDrag.model);
      resDrag.drop();
      resDrop.addChild(newNode);
      return { data: Object.assign({}, root.model), subtree: null, trail: [] };
    });
  };

  removeFromTrash = index => {
    this.setState(prevState => {
      const trash = [...prevState.trash.slice(0, index), ...prevState.trash.slice(index + 1)];
      return { trash };
    });
  };

  restoreNode = index => {
    this.setState(prevState => {
      const item = prevState.trash[index];
      const node = item.node;
      const parent = item.parent;

      const tree = new TreeModel();
      const root = tree.parse(prevState.data);

      const res = root.first(node => node.model.key === parent.key);
      if (!res) {
        message.error('Parent missing! Can not be restored.');
        return null;
      }
      const newNode = tree.parse(node);
      res.addChild(newNode);
      const trash = [...prevState.trash.slice(0, index), ...prevState.trash.slice(index + 1)];
      return { data: Object.assign({}, root.model), subtree: null, trail: [], trash };
    });
  };

  emptyTrash = () => {
    this.setState({ trash: [] });
  };
}

export default DataContainer;
