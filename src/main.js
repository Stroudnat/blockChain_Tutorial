const SHA256 = require('crypto-js/sha256');

class Transaction{ //defining a transaction that is added to pending transactions
    constructor(fromAddress, toAddress, amount){ 
        this.fromAddress = fromAddress; // ideally the public address of someones wallet
        this.toAddress = toAddress; // ideally public address also
        this.amount = amount; // #
    }
}

class Block{ //the block itself with parameters to identify: index, timestamp, data, and the previous hash
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions; //will recieve an array of transactions
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
        this.difficulty = 5; // CHANGE THIS NUMBER TO LESSEN MINING TIME (Added to proof of work)
        this.pendingTransactions = []; 
        this.miningReward = 100; 
    }

    createGenesisBlock(){
        return new Block("01/01/2022", "Genesis Block", "0") //props for genesis block.. the first block
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]; //returning the last block in the chain
    }

    minePendingTransactions(miningRewardAddress){ //mRA should be wallet address to send rewards to
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash); //currently passing ALL pending transactions to new block
        block.mineBlock(this.difficulty); //difficulty can be changed for different mining/proof of work

        console.log('Block succsessfully mined!');
        this.chain.push(block); //adding new block to chainblock

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward) //resetting the transaction to have mining rewards
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction); //sending transaction to pending array of transactions
    }

    getBalanceOfAddress(address){ // there is no "wallet" only transactions on blocks
        let balance = 0; //start 0 based

        for(const block of this.chain){ //loop through blockchain
            for(const trans of block.transactions){ //within each block, loop through total transactions
                if(trans.fromAddress === address){ //logic to decrease balance 
                    balance -= trans.amount;
                }
                
                if(trans.toAddress === address){ // logic to increase balance
                    balance += trans.amount;
                }
            }
        }
        return balance; //return zero based balance
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
nateCoin.createTransaction(new Transaction('address1', 'address2', 100)); // new transaction with fake address
nateCoin.createTransaction(new Transaction('address2', 'address1', 50)); // new transaction with fake address
///////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('\n Starting the miner...'); // '\n starts new line'
nateCoin.minePendingTransactions('xaviers-address'); // start mining to random address (could be username?)

console.log('\n Balance of xavier is, ', nateCoin.getBalanceOfAddress('xaviers-address')); //checks random address (username?) for initial earnings '$0'
///////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('\n Starting the miner again...'); 
nateCoin.minePendingTransactions('xaviers-address'); //starts mining again 

console.log('\n Balance of xavier is, ', nateCoin.getBalanceOfAddress('xaviers-address')); //checks the balance again because there we just added the first mining reward getting ready to be second

//would have to start miner over in order to check previous reward amount, and we would be mining another reward ontop.