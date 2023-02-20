const secp = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const slicedKey = publicKey.slice(1);
    const hashedKey = keccak256(slicedKey).slice(-20);
    return `0x${toHex(hashedKey)}`;
  }

const address = "0x2e6ab27f57f4b2ee8a987f211efddf28d09602ac";

const privateKey = "9f7fe493bc1008021026b817beea606ba0f98277aba3e488255c369acf03312a";

const hash = sha256(utf8ToBytes(toString(50)));

const [signature, recoveryBit] = secp.signSync(toHex(hash),privateKey, {recovered: true});

const hexSign = toHex(signature);

const hexToBytesSign = hexToBytes(hexSign);

const publicKey = secp.recoverPublicKey(toHex(hash), hexToBytesSign, recoveryBit);

console.log(toHex(hash),'\n',hexSign, recoveryBit);
console.log(getAddress(publicKey));
