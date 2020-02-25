/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
    return str
        .split('-')
        .reduce( (item, current) => {
            return item + current[0].toUpperCase() + current.slice(1);
    });
}
