const min = 0;
const max = 9999999
const pinLength = 6;

exports.getPinCode = () => {
    // Generates a random pin code of length specified by constant "pinLength"
    return ("0" + Math.floor(Math.random() * (max - min + 1))).substr(pinLength * (-1));
}