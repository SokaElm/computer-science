const { Linkedlist, Node} = require("./linkedlist.js");

class HashMap {
    constructor(capacity = null, loadfactor= null) {   
      this.storage = [];
      for (let index = 0; index < capacity; index++) {
        this.storage.push(new Linkedlist());
      }   
       this.loadfactor = loadfactor;
       this.capacity = capacity;

     }   
  

     hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this.capacity;
        }
     
        return hashCode;
      } 


      set(key,value) {
        
        let index = this.hash(key);
        let bucket = this.storage[index];
        let pair = new Pair(key,value);

        if (index < 0 || index >= this.storage.capacity) {
          throw new Error("Trying to access index out of bounds");
        }
      
        let current = bucket.head();

        while (current) {
          if (current.value.key === key) {current.value.value = value; return}
          current = current.nextNode;
          
        }
        bucket.append(pair);
        if (this.checkEntryNumber()) {this.grow()};
      }

      get(key) {

        let index = this.hash(key);

        if (index < 0 || index >= this.storage.capacity) {
          throw new Error("Trying to access index out of bounds");
        }

        let bucket = this.storage[index];
        let current = bucket.head();
       

        while (current) {
          if (current.value.key === key) {return current.value.value;}
          current = current.nextNode;
        }

        return null;

      }

      has(key) {

        let index = this.hash(key);

        if (index < 0 || index >= this.storage.capacity) {
          throw new Error("Trying to access index out of bounds");
        }

        let bucket = this.storage[index];
        let current = bucket.head();
       

        while (current) {
          if (current.value.key === key) {return true;}
          current = current.nextNode;
        }

        return false;

      }

      remove(key) {

        if (!this.has(key)) {return false}
       
        let index = this.hash(key);
        let bucket = this.storage[index];
        let current = bucket.head();
        let result = false;
       
        let nodeIndex = 0; 

        while (current) {
          if (current.value.key === key) {
            result = true;
            break;

          }
          nodeIndex++;
          current = current.nextNode;
          
       }
        
    bucket.removeAt(nodeIndex);
 
        return result;

      }

      toString(){
        return this.storage.map(list => list.head());
      }

      length () {

        let storedKeys = 0; 
        this.storage.forEach(list => storedKeys += list.size());
        return storedKeys;

      }

      clear() {
        this.storage = [];
        for (let index = 0; index < this.capacity; index++) {
          this.storage.push(new Linkedlist());
        }   
      }

      keys() {
  
        let keyArray = [];

        for (let i=0;i<this.capacity;i++) {
          let bucket = this.storage[i];
          let current = bucket.head();

          while (current) {
            keyArray.push(current.value.key);
            current = current.nextNode;
          }
      
      }
      return keyArray;
    }

    values() {
  
      let valueArray = [];

      for (let i=0;i<this.capacity;i++) {
        let bucket = this.storage[i];
        let current = bucket.head();

        while (current) {
          valueArray.push(current.value.value);
          current = current.nextNode;
        }
    }
    return valueArray;
  }

  entries () {
    let pairArray = [];
    let keys = this.keys();
    let values = this.values();
    let pairNumber = this.length();

    for (let i=0;i<pairNumber;i++){
      pairArray[i] = [keys[i],values[i]];
    }

    return pairArray;
  }

  checkEntryNumber () {

    return (this.length()>(this.capacity*this.loadfactor));
   
  }

  grow() {

  let pairArray = this.entries();
  this.capacity*=2;
  this.clear();

  pairArray.forEach(([key, value]) => this.set(key, value));

  }
  }

     class Pair {
      constructor(key,value) {
        this.key = key;
        this.value=value;
      }
     }

    // let hashmap = new HashMap(2,0.75);
    
    // hashmap.set("cat","kitty");
    // hashmap.set("tac","dory");
    // hashmap.set("dog","bobby");
    // hashmap.set("panda","bao");
    // console.log(hashmap.entries());


    module.exports = { HashMap, Pair};
