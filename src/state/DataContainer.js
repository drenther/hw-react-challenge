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
      res.drop();
      message.success('Deleted');
      return { data: Object.assign({}, root.model), subtree: null, trail: [] };
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
}

export default DataContainer;
