class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
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

  insert(value) {}

  deleteItem(value) {}

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(arr);

test.prettyPrint();
