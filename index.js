class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    this.root = this.buildTreePrep(this.mergeSort(array));
  }

  // Sort unsorted array in preparation:

  mergeSort(array) {
    if (array.length === 0) return;
    if (array.length === 1) return array;

    let firstHalf = array.slice(0, array.length / 2);
    let secondHalf = array.slice(array.length / 2);

    firstHalf = this.mergeSort(firstHalf);
    secondHalf = this.mergeSort(secondHalf);

    const sorted = [];
    let i = 0;
    let j = 0;

    while (i < firstHalf.length && j < secondHalf.length) {
      firstHalf[i] < secondHalf[j]
        ? sorted.push(firstHalf[i++])
        : sorted.push(secondHalf[j++]);
    }

    for (i; i < firstHalf.length; i++) {
      sorted.push(firstHalf[i]);
    }
    for (j; j < secondHalf.length; j++) {
      sorted.push(secondHalf[j]);
    }

    return sorted;
  }

  // Create Balanced Binary Search Tree:

  buildTree(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  // Prepare array by removing duplicates and passing start/end args to buildTree():

  buildTreePrep(array) {
    const duplicatesRemoved = array.filter(function (item, pos) {
      return array.indexOf(item) == pos;
    });
    return this.buildTree(duplicatesRemoved, 0, duplicatesRemoved.length - 1);
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (root.data === value) return root;

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  // Return leftmost child of arg;
  getSuccessor(current) {
    current = current.right;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  deleteItem(value, root = this.root) {
    if (root === null) return root;
    else if (root.data > value) {
      root.left = this.deleteItem(value, root.left);
    } else if (root.data < value) {
      root.right = this.deleteItem(value, root.right);
    } else {
      // If no children or only children to the right:
      if (root.left === null) return root.right;

      // If only children to the left:
      if (root.right === null) return root.left;

      // If both children are present:
      let successor = this.getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, root.right);
    }

    return root;
  }

  find(value, root = this.root) {
    if (root === null) return false;
    if (root.data === value) return root;
    if (value < root.data) {
      return this.find(value, root.left);
    } else {
      return this.find(value, root.right);
    }
  }

  isCallback(callback) {
    if (!callback) {
      throw new Error('No callback function provided!');
    }
    if (typeof callback !== 'function') {
      throw new Error('Argument has to be of type function!');
    }
  }

  levelOrder(callback, root = this.root) {
    this.isCallback(callback);

    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
      callback(queue[0]);
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);
      queue.shift();
    }
  }

  inOrder(callback, root = this.root) {
    if (root === null) return;
    this.isCallback(callback);

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (root === null) return;
    this.isCallback(callback);

    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (root === null) return;
    this.isCallback(callback);

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node = this.root) {
    if (node === null) return -1;

    let left = this.height(node.left);
    let right = this.height(node.right);

    return left > right ? left + 1 : right + 1;
  }

  depth(node, root = this.root) {
    if (!node) return false;
    if (root === null) return -1;
    if (root.data === node.data) return 0;

    let depth = 0;
    if (node.data < root.data) {
      depth += this.depth(node, root.left) + 1;
    } else {
      depth += this.depth(node, root.right) + 1;
    }

    return depth;
  }

  isBalanced() {
    let heightLeft = this.height(this.root.left);
    let heightRight = this.height(this.root.right);

    return (
      heightLeft === heightRight ||
      heightLeft + 1 === heightRight ||
      heightLeft - 1 === heightRight
    );
  }

  rebalance() {
    let tmp = [];
    this.inOrder((node) => tmp.push(node.data));
    this.root = this.buildTreePrep(this.mergeSort(tmp));
  }
}
