const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddressFromPKey(publicKey) {
    const keyWithoutCompressionByte = publicKey.slice(1);
    const pkHash = keccak256(keyWithoutCompressionByte);

    return pkHash.slice(-20);
}

module.exports = getAddressFromPKey;