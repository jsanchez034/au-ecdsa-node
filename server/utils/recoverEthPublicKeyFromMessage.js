import secp from "ethereum-cryptography/secp256k1.js";
import { hexToBytes } from "ethereum-cryptography/utils.js";
import publicKeyToEthPublicKey from './publicKeyToEthPublicKey.js';

export default function recoverEthPublicKeyFromMessage(hashedMessageHex, signatureHex, recoveryBit) {
    const hashedMessageByteArray = hexToBytes(hashedMessageHex);
    const signatureByteArray = hexToBytes(signatureHex);

    const fullPulicKey = secp.recoverPublicKey(hashedMessageByteArray, signatureByteArray, recoveryBit);

    return publicKeyToEthPublicKey(fullPulicKey);
}