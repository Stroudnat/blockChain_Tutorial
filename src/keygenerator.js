const EC = require('elliptic').ec; //generates public/privare key as well as ability to sign/verify signature
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex'); 

console.log()
console.log('Private Key: ', privateKey);

console.log()
console.log('Public Key: ', publicKey);
