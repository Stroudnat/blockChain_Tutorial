const SHA256 = require('crypto-js/sha256'); //generates hash
const EC = require('elliptic').ec; //generates public/privare key as well as ability to sign/verify signature
const ec = new EC('secp256k1');

class Transaction{ //defining a transaction that is added to pending transactions
    constructor(fromAddress, toAddress, amount){ // to and fron address are public keys to wallet 
        this.fromAddress = fromAddress; // ideally the public address of someones wallet
        this.toAddress = toAddress; // ideally public address also
        this.amount = amount; // #
    }
    
    calculateHash(){ //returns hash of transaction. We will sign this hash with private/public key
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey){ //we dont sign all data within block just the hash
        if(signingKey.getPublic('hex') !== this.fromAddress){ // can only spend coins users have the private key for
            throw new Error("You cannot sign transactions from other wallets!!")
        }

        const hashOfTrans = this.calculateHash(); // new hash for transaction
        const sig = signingKey.sign(hashOfTrans, 'base64'); // this is how we sign the hash itself, using base45
        this.signature = sig.toDER('hex'); //this changes the format of the signature?
    }

    isValid(){ //is the signature valid...
        if(this.fromAddress === null) return true; //if from address is null then its a reward and true
        if(!this.signature || this.signature.length === 0){ // if there is no signature/the length is zero then the trans. is invalid
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex'); // after passing tests, we take the public key
        return publicKey.verify(this.calculateHash(), this.signature) //we return if the public key was created correctly 
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
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString(); //returns the block and calculates hash .toString
    }

    mineBlock(difficulty){ //proof of work (mining)
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){ //Loop will keep running until the first (0th) number through dificulty (#) is equal to all 0s
            this.nonce++; //random assignment, contents of block won't change unless the contents of block change. Random assessment changes by 1 
            this.hash = this.calculateHash(); //hash calculation from SHA256
        }
        console.log("Block mined: " + this.hash); //lets us know what blocks were just mined by the hash... hash starts with 0s is length of difficulty to take time
    }

    hasValidTransactions(){ //checking transactions within current block
        for(const trans of this.transactions){
            if(!trans.isValid()){ //again checking for the correct signature 
                return false;
            }
        }

         return true; //if signature is signed correctly 
    }
}

class Blockchain{ //the block chain than is storred in the constructor. this.chain= [array].
    constructor(){
        this.chain = [this.createGenesisBlock()]; //this is the array of blocks creating the chain
        this.difficulty = 2; // CHANGE THIS NUMBER TO LESSEN MINING TIME (Added to proof of work)
        this.pendingTransactions = []; 
        this.miningReward = 100; 
    }

    createGenesisBlock(){
        return new Block("01/01/2022", "Genesis Block", "0") //props for genesis block.. the first block
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]; //returning the last block in the chain
    }

    minePendingTransactions(miningRewardAddress){ //mRA should be wallet address to send rewards to private wallet address
        const rewardTrans = new Transaction(null, miningRewardAddress, this.miningReward); //reward for mining a block
        this.pendingTransactions.push(rewardTrans); // pushing the reward to the pending transactons array


        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash); //currently passing ALL pending transactions to new block
        block.mineBlock(this.difficulty); //difficulty can be changed for different mining/proof of work

        console.log('Block succsessfully mined!');
        this.chain.push(block); //adding new block to chainblock

        this.pendingTransactions = [ // your reward is another transaction from the system not any address
            new Transaction(null, miningRewardAddress, this.miningReward) //resetting the transaction to have mining rewards
        ];
    }

    addTransaction(transaction){ // addind transactions that are not reards, checking for to/from address
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('From or to address missing from transaction!');
        }
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain!')
        }

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

            if(!currentBlock.hasValidTransactions()){
                return false;
            }
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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;