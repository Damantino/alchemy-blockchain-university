const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

function getAddress(publicKey) {
    const slicedKey = publicKey.slice(1);
    const hashedKey = keccak256(slicedKey).slice(-20);
    return `0x${toHex(hashedKey)}`;
}

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

console.log("Private key:" ,'\n', toHex(privateKey));
console.log("Public key:" ,'\n', toHex(publicKey));
console.log("Address: " ,'\n', getAddress(publicKey));