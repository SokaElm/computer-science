class Linkedlist {
   constructor() {      
      this.list = null;
    }    

    isEmpty(){
        return this.list == null;
    }

    append(value) {
        let newNode = new Node(value);
        let current = this.list;

        if (this.list === null) {this.list= newNode}

        else {

        while  (current.nextNode) {
            current = current.nextNode;
        }
        current.nextNode = newNode;
    }

    }

    prepend(value) {
        let newNode = new Node(value); 
        

        if (this.list === null) {this.list= newNode;}
        else {
        
        newNode.nextNode = this.list;
        this.list = newNode;
    }
    }

size() { 
    let current = this.list;
     let i=0;

    while (current !== null) {
        current = current.nextNode;
        i++;
    }
   return i;
}

head() {

    if (this.list === null) {return null};
   
    return new Node(this.list.value,this.list.nextNode);
}

tail() {

    if (this.list === null) {return null};

    let current = this.list; 

    while (current.nextNode !=null) {
        current = current.nextNode; 
    }

    return current;

}

at(index) {

    if (this.list === null) {return null};

    let current = this.list;
    for (let i=0;i<index;i++) {   
        current = current.nextNode; 
    }
    return current;
}

pop() {

if (this.list === null) {return null};
let current = new Linkedlist();

    for (let i=0;i<this.size()-1;i++) {
        current.append(this.at(i).value);
        
    }

    return current;
}

contains(value) {

    if (this.list === null) {return false};

    let result =false;
    let i=0;
   
    while ((i<this.size())&&(result===false)) {

        if (value === this.at(i).value) {
           
            result = true; }
i++}
    
    return result;  
}

find(value) {

    if (!this.contains(value)) {return null};

    let i=0;
  
    while (i<this.size()) {

        if (value === this.at(i).value) {
          return i}
        i++}
    
    return i;  
}

toString() {
    
if (this.list===null) {return "null"};

let string="";

for (let i =0;i<this.size();i++) {

    string = `${string}( ${this.at(i).value} ) -> `;
    
}
string = string+"null";

return string;
}

insertAt(value,index) {

    let newNode = new Node(value);

    if ((this.list === null)&&(index===0)) {this.list = newNode} 
    if (index===0) {this.prepend(value);}
    if(index === this.size()-1) {this.append(value);}

    else {
    newNode.nextNode= this.at(index);

    let current = new Linkedlist();
    let leftList = new Linkedlist();

for (let i =0; i< index;i++) {
    current.append(this.at(i).value);
}

leftList = current.at(index-1);
leftList.nextNode = newNode;

this.list = leftList;
}
return this.list;
}

removeAt(index) {

    if (this.list === null) return null;

    if (index===0) {return this.list = this.at(1);}

    if(index === this.size()-1) {
      return this.pop();
    }

    else {
    let rightList = this.at(index+1);
    let leftList = new Linkedlist();

for (let i =0; i< index;i++) {
    leftList.append(this.at(i).value);
}

leftList = leftList.at(index-1);
leftList.nextNode=rightList;

return leftList;
}

}


}

class Node {
    constructor(value=null,nextNode=null) {      
       this.value = value;
       this.nextNode = nextNode;
     
     }    
 }

 let list = new Linkedlist();
 list.append("cat");
    list.append("dog");



 module.exports = { Linkedlist, Node };


 




