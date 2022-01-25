const SHA256 = require('crypto-js/sha256');

class Block{ //the block itself with parameters to identify: index, timestamp, data, and the previous hash
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; //nothing to do with block but able to be different for proof of work addition to hash
    }

    calculateHash(){ //installed dependency SHA256 in order to calculate hash 
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString(); //returns the block and calculates hash .toString
    }

    mineBlock(difficulty){ //proof of work (mining)
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){ //Loop will keep running until the first (0th) number through dificulty (#) is equal to all 0s
            this.nonce++; //random assignment, contents of block won't change unless the contents of block change. Random assessment changes by 1 
            this.hash = this.calculateHash(); //hash calculation from SHA256
        }
        console.log("Block mined: " + this.hash); //lets us know what blocks were just mined by the hash... hash starts with 0s is length of difficulty to take time
    }
}

class Blockchain{ //the block chain than is storred in the constructor. this.chain= [array].
    constructor(){
        this.chain = [this.createGenesisBlock()]; //this is the array of blocks creating the chain
        this.difficulty = 2; //able to change in order for proof of work to take longer
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2022", "Genesis Block", "0") //props for genesis block.. the first block
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]; //returning the last block in the chain
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash; // getting block from the last hash befor adding next block
        newBlock.mineBlock(this.difficulty); //mine new block run through the proof of work
        this.chain.push(newBlock); //adding block. only for simple block chain.
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){ //looping through the current array (wrong or right)
            const currentBlock = this.chain[i]; //current block just added
            const previousBlock = this.chain[i - 1]; //previous block before adding
        
            if(currentBlock.hash !== currentBlock.calculateHash()){ //returns false if there is difference from current hash and calculated hash
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){ //returns false if the previous hashes dont match up
                return false;
            }
        }
        return true; //really want nothing to be wrong so returns true
    }
}

let nateCoin = new Blockchain(); //instance of adding new block chain
console.log("Mining block 1...");
nateCoin.addBlock(new Block(1, "01/02/2022", {amount: 4})); //block #1 with parameters

console.log("Mining block 2...");
nateCoin.addBlock(new Block(2, "01/02/2022", {amount: 8})); //block #2 with parameters

console.log("Mining block 3...");
nateCoin.addBlock(new Block(3, "01/02/2022", {amount: 12})); //block #3 with parameters

//console.log('Is blockchain valid?' + nateCoin.isChainValid()); // is block chain valid before changes

//nateCoin.chain[1].data = {amount: 100}; //any changes that might break the chain
//nateCoin.chain[1].hash = nateCoin.chain[1].calculateHash(); //any changes that might break the chain

//console.log('Is blockchain valid?' + nateCoin.isChainValid()); //is block chain valid after changes

//console.log(JSON.stringify(nateCoin, null, 4)); //logs whole block chain