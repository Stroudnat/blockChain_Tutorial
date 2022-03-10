# Simple Block Chain JS

## Description

This is my first attemp at making a block chain following the model form [Simply Explained](https://www.youtube.com/watch?v=zVqczFZr124) on his youtube channel. I love front end development and want to figure out how the front end connects to smart contracts and how to build/maintain a peer to peer network. This is a simple example showcasing blocks conatining an individual hash, timestamp and transactions that are either peer to peer transactions or mining rewards for adding a block to the chain. 

Block chains in general consist of: data of some kind (my transactions), an individual hash (long string of numbers/letters), as well as the hash of the previous block. This not only makes the links between blocks but allows us to monitor changes and make some kind of validation for the chain, so nothing is tampered with or removed. 

## Download and Usage (npm)

1) Fork/Clone repository to local machine
2) Install dependencies from the package.json using command: "npm install"
3) Run file from node to see block chain using command: "node src/main.js"

# Extra Notes

## Updates

Last update to my simple blockchain, I worked on the the functionallity to sign actual transactions. What this does is monitors who has nateCoin Rewards and who does not. By signing transactions one can only spend the coins that are signed by their private wallet ID. This symbolizes ownership and instills an ethical code of not spending others coins. 

Before working on transactions and their wallet signatures I made mining rewards for users to get upon addition of a new block to the blockchain. These rewards are formed to promote mining blocks and is one way of controlling the distrobution of natecoin's. Prior to adding mining rewards I worked on proof of work for creating actual blocks. Proof of work is security that limits the amount of blocks made at a time so functions cannot add/take awat hundrids or thousands of blocks at a time. Currently this blockchain takes around 7 seconds per block to mine with a difficulty of 5 (lower to take less time). 

## Future Plans 

Next I look forward to working on and instilling a user interface and make some kind of peer to peer network. This will help get the application out of the terminal as well as help secure the blockchain by fact checking with other versions of the blockchain distributed within the user network.
