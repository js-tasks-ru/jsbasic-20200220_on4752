/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
    let result = 1;

    while (true) {
        if (n === 0 || n === 1) return result;

        result *= n;
        --n;
    }
}
