# Simple Block Chain JS

## Description

This is my first attemp at making a block chain following the model form [Simply Explained](https://www.youtube.com/watch?v=zVqczFZr124) on their youtube channel. I love front end development and want to figure out how the front end connects to smart contracts and how to build/maintain a peer to peer network. This is a simple example showcasing blocks conatining an individual hash, timestamp, data, and an index to track the placement of each block as they are added to the chain. 

Block chains in general consist of: data of some kind, an individual hash (long string of numbers/letters), as well as the hash of the previous block. This not only makes the link between blocks but allows us to monitor changes and make some kind of validation for the chain, so nothing is tampered with or removed. 

## Download and Usage (npm)

1) Fork/ Clone repository to local machine
2) Install dependencies from the package.json using command: "npm install"
3) Run file from node to see block chain using command: "node main.js"
4) un-comment out the last lines to see/change functionality and test the validity of your chain

# Extra Notes

## Updates

Originally this project started out as a simple block chain conatining a constructor and methods for block class as well as a constructor and different methods to maintain the chain class. This project currently runs in the terminal for viewing using Node commands. Recently I added proof of work, which is also called mining. Mining makes the computer take a given time (given by the "difficulty") to create these blocks on the chain, so attackers cannot instantly change values of the data or time or placement of any blocks with a simple function within milliseconds. Difficulty delays computers strong computing power. 

## Problems fixed 

Without proof of work an attacker can easily write a function within the source code to alter the design/data within a block or chain or even add/delete whole blocks within milliseconds. With more time in between creation of blocks, allows the peer to peer network or a function to create consensus through out copies of the blockchain given out (given to peers) as well as the original that might be getting tampered with. Consensus allows us to track changes any changes that will break the blockchain before the wwhole chain is attacked and repaired. 
