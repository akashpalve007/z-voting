const { Co2Sharp } = require('@mui/icons-material');
const snarkjs = require('snarkjs');

async function buildProof(voters, index, publicRoot, votingKeyGenerator, configloader){
    const vkgHex = Buffer.from(votingKeyGenerator).toString('hex');
    try {
        console.log("buildproof");
        const config = configloader.getBuildProofConfig();
        
        const {
            proof,
            publicSignals
        } = await snarkjs.groth16.fullProve({
            VotingKeyGenerator: '0x' + vkgHex,
            index: index,
            publicRoot: publicRoot,
            voters: voters
            },
            config.wasmpath,
            config.zkeypath);

        const calldata = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
        const abc = JSON.parse("[" + calldata + "]");
        return abc;
    } catch (error) {
        console.error(error);
        return false;
    }
}
module.exports = buildProof;