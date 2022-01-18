# Simple Block Chain JS

## Description

This is my first attemp at making a block chain following the model form [Simply Explained](https://www.youtube.com/watch?v=zVqczFZr124) on their youtube channel. I love front end development and want to figure out how the front end connects to smart contracts and how to build/maintain a peet to peer network. This is a simple example showcasing a hash, timestamp, data, and an index to track the placement of each block as they are added to the chain. 

Block chains in general consist of: data of some kind, an individual hash (long string of numbers/letters), as well as the hash of the previous block. This not only makes the link between blocks but allows us to monitor changes and make some kind of validation for the chain, so nothing is tampered with or removed. 

## Download and Usage (npm)

1) Fork/ Clone repository to local machine
2) Install dependencies from the package.json using command: "npm install"
3) Run file from node to see block chain using command: "node main.js"
4) un-comment out the last lines to see/change functionality

## Extra Notes

What could be added to this project to make it complete is the use of a UI (connecting users in peer to peer network), proof of work and a smart comtract. a User Interface to connect all of the users. This peer to peer network allows a copy of the block chain to be sent to all users for an overall consensus of the correct chain to use. Proof of work allows the creation of blocks to slow down so automated functions cannot change hashes or previous hashes within milliseconds to hundreds or thousands of blocks. I could also add the use of a smart contract. Smart contracts are smaller programs stored within the block chain and allows trading within certian conditions. The best security uses the combination of hashing, proof of work, smart contracts and peer to peer networks to help delay attackers and keep the block chain safe. 
