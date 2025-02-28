import Tree from './index.js';

// Function to print BST to console:

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Testing methods:

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(arr);

prettyPrint(test.root);
console.log(`\nTree is balanced: ${test.isBalanced()}\n`);

let levelOrder = [];
let preOrder = [];
let inOrder = [];
let postOrder = [];

test.levelOrder((node) => levelOrder.push(node.data));
test.preOrder((node) => preOrder.push(node.data));
test.inOrder((node) => inOrder.push(node.data));
test.postOrder((node) => postOrder.push(node.data));

console.log(
  `Level Order: ${levelOrder}\n
   Pre Order: ${preOrder}\n
   In Order: ${inOrder}\n
   Post Order: ${postOrder}\n`
);

test.insert(6);
test.insert(2);
test.insert(69);
test.insert(112);
test.insert(256);
test.insert(301);

console.log(test.find(5));
console.log('');

prettyPrint(test.root);
console.log(`\nTree is balanced: ${test.isBalanced()}\n`);

test.rebalance();

prettyPrint(test.root);
console.log(`\nTree is balanced: ${test.isBalanced()}\n`);

levelOrder = [];
preOrder = [];
inOrder = [];
postOrder = [];

test.levelOrder((node) => levelOrder.push(node.data));
test.preOrder((node) => preOrder.push(node.data));
test.inOrder((node) => inOrder.push(node.data));
test.postOrder((node) => postOrder.push(node.data));

console.log(
  `Level Order: ${levelOrder}\n
   Pre Order: ${preOrder}\n
   In Order: ${inOrder}\n
   Post Order: ${postOrder}`
);
