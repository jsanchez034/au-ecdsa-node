import express from "express";
import cors from "cors";
import { toHex } from "ethereum-cryptography/utils.js";

import recoverEthPublicKeyFromMessage from './utils/recoverEthPublicKeyFromMessage.js';
import publicKeyToEthPublicKey from './utils/publicKeyToEthPublicKey.js';

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "f824130180eb6ba1f458417c45c2893d54f61c90": 100,
  "8e736268e1b49559f7fb26452f24e63abf3a217e": 50,
  "86bbcd9324041c3bbf56f6f66bf374a5943e3f2d": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {
    sender,
    recipient,
    amount,
    hashedMessage,
    signature,
    recoveryBit
  } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const derivedSenderPublicKey = recoverEthPublicKeyFromMessage(hashedMessage, signature, parseInt(recoveryBit));

  if (derivedSenderPublicKey !== sender) {
    res.status(403).send({ message: "Unauthorized: Signature is not verified to be sender" });
    return;
  }

  if (amount <= 0) {
    res.status(400).send({ message: "Bad request: Need to send more than 0 amount" });
    return;
  }
  
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Bad request: Not enough funds!" });
    return;
  }
  
  balances[derivedSenderPublicKey] -= amount;
  balances[recipient] += amount;
  res.send({
    senderBalance: balances[derivedSenderPublicKey],
    recipientBalance: balances[recipient] 
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
