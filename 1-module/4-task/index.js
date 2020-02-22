/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
    str = str.toLowerCase();

    return str.includes('1xbet') || str.includes('xxx');
}
