/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
    let result = '';

    for (let object of data) {
        if (object.age <= age) {
            result += `\n${object.name}, ${object.balance}`;
        }
    }

    return result.slice(1);
}
