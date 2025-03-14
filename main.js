//const { Linkedlist, Node } = require("./linkedlist.js");
const { HashMap, Pair } = require("./hashmap.js");
const { Tree } = require("./BST.js");

//const list = new Linkedlist();

// list.append("dog");
// list.append("cat");
// list.append("parrot");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");

// console.log(list.toString());

// const test = new HashMap(16,0.75);
// test.set('apple', 'red')
// test.set('banana', 'yellow')
// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')
// test.set('moon', 'silver')
// test.remove("kite")
// console.log(test.toString());
// console.log(test.has("kite"));

function getRandomNumbersArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let array = getRandomNumbersArray(6);
let tree = new Tree(array);
console.log(tree.isBalanced(this.root));
tree.PreOrder(tree.root, (value) => console.log(value));
tree.InOrder(tree.root, (value) => console.log(value));
tree.PostOrder(tree.root, (value) => console.log(value));
tree.insert(tree.root, 150);
tree.insert(tree.root, 447);
tree.insert(tree.root, 354);
console.log(tree.isBalanced(tree.root));
tree.reBalance();
console.log(tree.isBalanced(tree.root));
tree.PreOrder(tree.root, (value) => console.log(value));
tree.InOrder(tree.root, (value) => console.log(value));
tree.PostOrder(tree.root, (value) => console.log(value));
