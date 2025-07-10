const {
    groth16
} = require('snarkjs');

async function merkleTreeBuilder(voters, configloader) {
    try {
        console.log("buildproof");
        const config = configloader.getMerkleTreeConfig();

        const {
            proof,
            publicSignals
        } = await groth16.fullProve({
                voters: voters
            },
            config.wasmpath,
            config.zkeypath);

        console.log(publicSignals);
        console.log('publicSignals:',publicSignals[0])
        return publicSignals[0];
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = merkleTreeBuilder;