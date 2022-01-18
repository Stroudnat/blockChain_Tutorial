const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString(); //without toString we get an object returned
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; //this is the array of blocks creating the chain
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2022", "Genesis Block", "0") //props for genesis block
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock); //only for simple block chain
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
        
            if(currentBlock.hash !== currentBlock.calculateHash()){ //returns false if there is difference from current hash and calculated hash
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let nateCoin = new Blockchain();

nateCoin.addBlock(new Block(1, "01/02/2022", {amount: 4}));
nateCoin.addBlock(new Block(2, "01/02/2022", {amount: 8}));
nateCoin.addBlock(new Block(3, "01/02/2022", {amount: 12}));

console.log('Is blockchain valid?' + nateCoin.isChainValid()); 

nateCoin.chain[1].data = {amount: 100};
nateCoin.chain[1].hash = nateCoin.chain[1].calculateHash();

console.log('Is blockchain valid?' + nateCoin.isChainValid()); 

//console.log(JSON.stringify(nateCoin, null, 4));