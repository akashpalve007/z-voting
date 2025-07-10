pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/pedersen.circom";

const decompress1Key = [
    131, 174, 209, 244, 233, 245, 146, 177, 105, 74, 31, 58, 216, 255, 155, 128,
    94, 120, 100, 61, 29, 248, 217, 128, 160, 149, 185, 206, 45, 25, 37, 75,
    110, 158, 191, 216, 230, 16, 36, 157, 98, 144, 172, 208, 198, 26, 48, 79,
    124,  88, 146, 167, 202, 37, 16, 32, 74, 161, 183, 109, 12, 230, 31, 208,
    178, 169, 129, 165, 211, 231
];

template VotingKeyGenerator() {
    signal input in;
    signal output out;

    // You can use decompress1Key in your logic if needed, e.g., as a constant array
    // For now, we just hash the input using Pedersen
    component pedersen = Pedersen(1);
    pedersen.in[0] <== in;
    pedersen.out[0] ==> out;
}

// Uncomment to instantiate the main component
// component main = VotingKeyGenerator();