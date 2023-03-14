import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex } from "ethereum-cryptography/utils.js";

export default function publicKeyToEthPublicKey(publicKey) {
  const ethereumPublicKey = keccak256(publicKey.slice(1)).slice(-20);
  return toHex(ethereumPublicKey);
}