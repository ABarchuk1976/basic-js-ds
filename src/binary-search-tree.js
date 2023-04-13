// const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    if (!this.treeRoot) {
      this.treeRoot = {
        data,
        left: null,
        right: null,
      };
      return;
    }

    let currentNode = this.treeRoot;

    while (currentNode.data !== data) {
      if (currentNode.data > data) {
        if (!currentNode.left) {
          currentNode.left = { data, left: null, right: null };
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = { data, left: null, right: null };
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  has(data) {
    if (!this.treeRoot) return false;

    let currentNode = this.treeRoot;

    while (currentNode.data !== data) {
      if (currentNode.data > data) {
        if (!currentNode.left) {
          return false;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          return false;
        } else {
          currentNode = currentNode.right;
        }
      }
    }

    return true;
  }

  find(data) {
    if (!this.treeRoot) return false;

    let currentNode = this.treeRoot;

    while (currentNode.data !== data) {
      if (currentNode.data > data) {
        if (!currentNode.left) {
          return null;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          return null;
        } else {
          currentNode = currentNode.right;
        }
      }
    }

    return currentNode;
  }

  _minSubtree(node) {
    if (!node.left) {
      return node;
    }
    return this._minSubtree(node.left);
  }

  _deleteNode(node, data) {
    if (node.data === data) {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      const minNode = this._minSubtree(node.right);

      node.data = minNode.data;
      node.right = this._deleteNode(node.right, minNode.data);

      return node;
    }

    if (node.data > data) {
      if (!node.left) return node;
      node.left = this._deleteNode(node.left, data);
      return node;
    }

    if (node.data < data) {
      if (!node.right) return node;
      node.right = this._deleteNode(node.right, data);
      return node;
    }
  }

  remove(data) {
    if (!this.treeRoot) return;
    this.treeRoot = this._deleteNode(this.treeRoot, data);
  }

  min() {
    if (!this.treeRoot) return null;
    if (!this.treeRoot.left) return this.treeRoot.data;
    let node = this.treeRoot;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.treeRoot) return null;
    if (!this.treeRoot.right) return this.treeRoot.data;
    let node = this.treeRoot;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

const tree = new BinarySearchTree();

tree.add(9);
tree.add(14);
tree.add(2);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(31);
tree.add(54);
tree.add(1);
tree.remove(14);
tree.remove(8);
tree.remove(9);

console.log(tree);
console.log('Has: ', tree.has(128));

module.exports = {
  BinarySearchTree,
};
