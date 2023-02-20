import express from 'express';
import cors from 'cors';
import { getAddress, recoverPublicKey } from '../shared/helperFunctions.js';

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = new Map();
balances.set("0x2e6ab27f57f4b2ee8a987f211efddf28d09602ac", 100);
balances.set("0x36d8d0fd870e1657f27497244429838808f76a02", 75);
balances.set("0x4aa7528a9ecd45ffb98b8afd8813c355e9e09d4c", 50);


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances.get(address);
  if(!balance){
    res.statusMessage = "Address doesn\'t exist";
    res.status(404).end();
  } else {
    res.send({ balance });
  }
});

app.post("/send", (req, res) => {

  const { sender:{ signature, recoveryBit}, recipient, amount } = req.body;

  const publicKey = recoverPublicKey(amount, signature, recoveryBit);

  const address = getAddress(publicKey);

  setInitialBalance(address);
  setInitialBalance(recipient);

  if (balances.get(address) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances.set(address, balances.get(address) - amount);
    balances.set(recipient, balances.get(recipient) + amount);
    res.send({ balance: balances.get(address) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances.get(address)) {
    balances.set(address, 0);
  }
}
