/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
    let ul = document.createElement('ul');

    friends.forEach(obj => {
        let li = document.createElement('li');
        li.textContent = `${obj.firstName} ${obj.lastName}`;

        ul.append(li);
    });

    return ul;
}
