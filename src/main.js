const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec; //generates public/privare key as well as ability to sign/verify signature
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('0276ff1824ffeac5e63b5915c5c13e07a58df28ca3bf776ac94625590893fdb6');
const myWalletAddress = myKey.getPublic('hex'); // (?) 04bbda71cfc95dc47e05b7e055dcbd2b4682c6da69ba27ed9dfd55401d87485a088cc9186d7bad5b684c96bffe9470943cb174fe18398f2275413d393563f0e92c

let nateCoin = new Blockchain(); //instance of adding new block chain

const trans1 = new Transaction(myWalletAddress, 'Public key goes here', 10)
trans1.signTransaction(myKey); //sign with private key
nateCoin.addTransaction(trans1);

console.log('\n Starting the miner...'); // '\n starts new line'
nateCoin.minePendingTransactions(myWalletAddress); // start mining to public wallet address

console.log('\n Balance of xavier is, ', nateCoin.getBalanceOfAddress(myWalletAddress)); //checks public wallet address, adds mining rewards and subtracts/adds trans for balance

nateCoin.chain[1].transactions[0].amount = 1; //try to change a previous transaction within blockchain

console.log('Is chain valid? ', nateCoin.isChainValid());  //checking to see if the current chain is valid

