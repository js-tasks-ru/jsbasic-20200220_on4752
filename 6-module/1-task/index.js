/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: 'Ilia',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *      },
 *
 * @constructor
 */
class ClearedTable {
  constructor(data) {
    this.el = document.createElement('table');
    this.data = data;

    this.el.classList.add('pure-table');

    this.el.appendChild( this.createRow(this.data, 'thead') );
    this.el.appendChild( this.createRow(this.data, 'tbody') );

    this.el.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        this.delete( e.target.closest('tr') );
        this.onRemoved(+e.target.dataset.id);
      }
    });
  }

  /**
   * Метод который вызывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {}

  delete(el) {
    el.remove();
  }

  createRow (arr, node) {
    let element = document.createElement(node);

    if (node === 'thead') {
      let tr = document.createElement('tr');

      tr.innerHTML = `<td>Name</td>
                      <td>Age</td>
                      <td>Salary</td>
                      <td>City</td>
                      <td></td>`;

      element.appendChild(tr);
    } else {
        for (const obj of arr) {
          let tr = document.createElement('tr');

          tr.innerHTML = `<td>${obj.name}</td>
                          <td>${obj.age}</td>
                          <td>${obj.salary}</td>
                          <td>${obj.city}</td>
                          <td><a data-id="${obj.id}" href="#delete">X</a></td>`;

          element.appendChild(tr);
        }
    }

    return element;
  }
}

window.ClearedTable = ClearedTable;
