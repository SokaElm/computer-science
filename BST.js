
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
        let sortedArray = array.sort((a,b)=>a-b);
        let newArray = [...new Set(sortedArray)];
    
        return this.buildTreeRec(newArray,0,newArray.length-1);

     }

     buildTreeRec (array,start,end) {
        
        if (start>end) return null;


        let mid = Math.floor((end+start)/2);
        let root = new Node(array[mid]);
        root.leftNode = this.buildTreeRec(array,start,mid-1);
        root.rightNode = this.buildTreeRec(array,mid+1,end);
    
        return root;
        }

        insert (value) {
            let current = this.root;
            let prevNode;
            let newNode = new Node(value);

            if (!current) return this.root = newNode;
            if (value === current.data) return;

            while (current) {
                prevNode=current;
            if (value<current.data) {
                current = current.leftNode;
            }
            else {current = current.rightNode;}
            }

            if (value<prevNode.data) {prevNode.leftNode= newNode;}
            else {prevNode.rightNode= newNode;}

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



 
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(array);
prettyPrint(tree.insert(14));

