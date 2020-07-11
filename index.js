require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(process.env.MAINNET_NODE_URL);
const prompt = require("prompt-sync")();

// PARAMETERS
const newGasPrice = 18e9;
const txHash =
  "0xec5ecd9bcfde7f9da0c1c7348ff135124790f1c0699748ced04bb5a2d7273e87";

const send = async () => {
  try {
    const myTx = await web3.eth.getTransaction(txHash);

    console.log("Your transaction details:\n", myTx);

    const response = prompt("Speed up this transaction? (y/n): ");
    if (response === "y" || response === "Y") {
      myTx.gasPrice = newGasPrice;
      const { rawTransaction } = await web3.eth.accounts.signTransaction(
        myTx,
        process.env.PRIVATE_KEY
      );
      web3.eth
        .sendSignedTransaction(rawTransaction)
        .once("transactionHash", function (hash) {
          console.log("New transaction Hash:", hash);
        })
        .once("receipt", function () {
          console.log("Transaction Mined!");
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};

send();
