class Node {
  constructor(data) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array) return null;

    let sortedArray = array.sort((a, b) => a - b);
    let newArray = [...new Set(sortedArray)];

    return this.buildTreeRec(newArray, 0, newArray.length - 1);
  }

  buildTreeRec(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor((end + start) / 2);
    let root = new Node(array[mid]);
    root.leftNode = this.buildTreeRec(array, start, mid - 1);
    root.rightNode = this.buildTreeRec(array, mid + 1, end);

    return root;
  }

  insert(root, value) {
    let newNode = new Node(value);

    if (!root) return newNode;
    if (value === root.data) return root;

    if (value < root.data) {
      root.leftNode = this.insert(root.leftNode, value);
    } else {
      root.rightNode = this.insert(root.rightNode, value);
    }
    return root;
  }

  deleteItem(root, value) {
    if (!root) return root;

    if (root.data > value) {
      root.leftNode = this.deleteItem(root.leftNode, value);
    } else if (root.data < value) {
      root.rightNode = this.deleteItem(root.rightNode, value);
    } else {
      if (!root.leftNode && !root.rightNode) {
        return null;
      } else if (!root.leftNode || !root.rightNode) {
        return root.leftNode || root.rightNode;
      } else {
        let successor = this.getInorderSuccessor(root);
        root.data = successor.data;
        root.rightNode = this.deleteItem(root.rightNode, successor.data);
      }
    }
    return root;
  }

  getInorderSuccessor(node) {
    let current = node.rightNode;

    while (current.leftNode) {
      current = current.leftNode;
    }
    return current;
  }

  find(root, value) {
    if (!root) return null;

    if (root.data > value) {
      return this.find(root.leftNode, value);
    } else if (root.data < value) {
      return this.find(root.rightNode, value);
    } else {
      return root;
    }
  }

  levelOrder(callbackFn) {
    if (callbackFn === undefined || typeof callbackFn !== "function") {
      throw new Error("Le paramètre doit obligatoirement être une fonction !");
    }

    if (!this.root) return;
    let queue = [this.root];

    while (queue.length !== 0) {
      let current = queue[0];
      callbackFn(current.data);
      if (current.leftNode) queue.push(current.leftNode);
      if (current.rightNode) queue.push(current.rightNode);
      queue.shift();
    }
  }

  PreOrder(node, callbackFn) {
    if (callbackFn === undefined || typeof callbackFn !== "function") {
      throw new Error("Le paramètre doit obligatoirement être une fonction !");
    }

    if (!node) return;
    callbackFn(node.data);
    this.PreOrder(node.leftNode, callbackFn);
    this.PreOrder(node.rightNode, callbackFn);
  }

  InOrder(node, callbackFn) {
    if (callbackFn === undefined || typeof callbackFn !== "function") {
      throw new Error("Le paramètre doit obligatoirement être une fonction !");
    }

    if (!node) return;
    this.InOrder(node.leftNode, callbackFn);
    callbackFn(node.data);
    this.InOrder(node.rightNode, callbackFn);
  }

  PostOrder(node, callbackFn) {
    if (callbackFn === undefined || typeof callbackFn !== "function") {
      throw new Error("Le paramètre doit obligatoirement être une fonction !");
    }

    if (!node) return;
    this.PostOrder(node.leftNode, callbackFn);
    this.PostOrder(node.rightNode, callbackFn);
    callbackFn(node.data);
  }

  height(node) {
    if (!node) return -1;

    let nodeHeight;
    if (!node.leftNode && !node.rightNode) {
      nodeHeight = 0;
    }

    nodeHeight =
      1 + Math.max(this.height(node.leftNode), this.height(node.rightNode));
    return nodeHeight;
  }

  depth(node) {
    if (!node) return -1;

    let depthNode;
    depthNode =
      this.height(this.root) - this.height(this.find(this.root, node.data));
    return depthNode;
  }

  isBalanced(node) {
    if (!node) return true;

    let diff = Math.abs(
      this.height(node.leftNode) - this.height(node.rightNode)
    );

    if (diff > 1) return false;

    return this.isBalanced(node.leftNode) && this.isBalanced(node.rightNode);
  }

  reBalance() {
    let array = [];
    this.PreOrder(this.root, (data) => array.push(data));
    this.root = this.buildTree(array);
  }
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

// let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let tree = new Tree(array);
// tree.insert(tree.root, 8759);
// tree.insert(tree.root, 7880);
// tree.reBalance();
// console.log(tree.isBalanced(tree.root));

// prettyPrint(tree.root);

module.exports = { Tree, Node };
