import secp from "ethereum-cryptography/secp256k1.js";
import { toHex, hexToBytes } from "ethereum-cryptography/utils.js";

const privateKeyByteArray = hexToBytes(process.argv[2]);
const hashedMessageByteArray = hexToBytes(process.argv[3]);


const [sig, recoveryBit]  = await secp.sign(hashedMessageByteArray, privateKeyByteArray, { recovered : true });

console.log('Transaction Message Signature:', toHex(sig));
console.log('Recovery Bit:', recoveryBit);