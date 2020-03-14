/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */

function highlight(table) {
    for (row of table.lastElementChild.rows) {
        if ( !row.lastElementChild.hasAttribute('data-available') ) {
            row.hidden = true;
        } else if ( row.lastElementChild.getAttribute('data-available')  === 'true' ) {
            row.classList.add('available');
        } else {
            row.classList.add('unavailable');
        }

        if (row.lastElementChild.previousElementSibling.textContent === 'm') {
            row.classList.add('male');
        } else {
            row.classList.add('female');
        }

        if ( +row.firstElementChild.nextElementSibling.textContent < 18) {
            row.style="text-decoration: line-through";
        }
    }
}