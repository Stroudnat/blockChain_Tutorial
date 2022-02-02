# Simple Block Chain JS

## Description

This is my first attemp at making a block chain following the model form [Simply Explained](https://www.youtube.com/watch?v=zVqczFZr124) on their youtube channel. I love front end development and want to figure out how the front end connects to smart contracts and how to build/maintain a peer to peer network. This is a simple example showcasing blocks conatining an individual hash, timestamp, data, and an index to track the placement of each block as they are added to the chain. 

Block chains in general consist of: data of some kind, an individual hash (long string of numbers/letters), as well as the hash of the previous block. This not only makes the link between blocks but allows us to monitor changes and make some kind of validation for the chain, so nothing is tampered with or removed. 

## Download and Usage (npm)

1) Fork/ Clone repository to local machine
2) Install dependencies from the package.json using command: "npm install"
3) Run file from node to see block chain using command: "node src/main.js"

# Extra Notes

## Updates

Last update to the simple blockchain I made was the addition of proof of work. Proof of work is security that limits the amount of blocks made at a time so functions cannot add/take awat hundrids or thousands of blocks at a time. Currently this blockchain takes around 7 seconds per block to mine with a difficulty of 5 (lower to take less time). 

Recently I have added a reward system to the blockchain as well as transactions to handle the reward system and manipulate the "data" section we once had. If a blocl is mined correctly there will be a reward of 100 "coins" or currency and being added to the pending transactions to later be added to the blockchain in order to keep track of spending. 

The exammple shown has two transactions with random addresses and usernames that can easily be changed. Running these two transactions take around 14 seconds as mining each block will take around 7 seconds each. Feel free to change the difficulty and add/change transactions in order to see functionality. 

## Future Plans 

No problems fixed, simply added a rewards and transaction system that keeps track and handles of spending. Fixes to be chaned will include: being able to spend coins you dont have among other security features as you are able to endlessly spend currently!
