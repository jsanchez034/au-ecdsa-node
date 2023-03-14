import secp from "ethereum-cryptography/secp256k1.js";
import publicKeyToEthPublicKey from '../utils/publicKeyToEthPublicKey';

const privateKey = secp.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log('public key:', publicKeyToEthPublicKey(publicKey));