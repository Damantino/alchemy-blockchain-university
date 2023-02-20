import * as sepc from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex, utf8ToBytes, hexToBytes } from "ethereum-cryptography/utils.js";
import { sha256 } from "ethereum-cryptography/sha256.js";

function getAddress(publicKey) {
  const slicedKey = publicKey.slice(1);
  const hashedKey = keccak256(slicedKey).slice(-20);
  return `0x${toHex(hashedKey)}`;
}

function hashMessageToHex(message) {
  return toHex(sha256(utf8ToBytes(toString(message))));
}

function recoverPublicKey(message, signature, recoveryBit) {
  return sepc.recoverPublicKey(
    hashMessageToHex(message),
    hexToBytes(signature),
    recoveryBit
  );
}

function getPublicKey(privateKey) {
  return secp.getPublicKey(privateKey);
}

function sign(message, privateKey) {
  return sepc.signSync(hashMessageToHex(JSON.stringify(message)), privateKey, {
    recovered: true,
  });
}

export { getAddress, recoverPublicKey, getPublicKey, sign };
