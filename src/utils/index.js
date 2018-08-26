import { v4 } from 'uuid';

export const getId = () => v4().slice(0, 8);

export function parseInitialRawData(data) {
  const tree = {
    name: 'Root',
    key: getId(),
    children: [],
  };
  tree.children = data.map(item => {
    return {
      name: item.title,
      key: getId(),
      children: [traverse(item['Game play resources'], 'Game play resources')],
    };
  });
  return tree;
}

function traverse(node, name) {
  if (node.constructor === Array) {
    return {
      name,
      key: getId(),
      children: node.map(({ file_name }) => ({ name: file_name, key: getId() })),
    };
  } else {
    return {
      name,
      key: getId(),
      children: Object.keys(node).map(key => traverse(node[key], key)),
    };
  }
}

export function saveToLS(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function loadFromLS(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return false;
  }
}

// export function generateParentTrail(node) {
//   const res = [node];
//   recurseUpwards(node, res);
//   return res.reverse();
// }

// function recurseUpwards(node, res) {
//   if (node.parent) {
//     res.push(node.)
//   } else {

//   }
// }
