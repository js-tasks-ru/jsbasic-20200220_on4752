/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
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
function SortableTable(items) {
  /**
   * @property {Element} - обязательное свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');

  this.el.appendChild( createRow(items, 'thead') );
  this.el.appendChild( createRow(items, 'tbody') );
  
  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
    let arr = Array.from( this.el.querySelectorAll('tbody tr') );

    if (column === 0) {
      arr.sort( (a, b) => {
        if (a.cells[column].textContent > b.cells[column].textContent) {
          return 1;
        }
        if (a.cells[column].textContent < b.cells[column].textContent) {
          return -1;
        }
        return 0;
      });

      if (desc === true) {
        arr.reverse();
        console.log(arr);
      }
    }

    if (column === 2) {
      arr.sort( (a, b) => a.cells[column].textContent - b.cells[column].textContent );
    }

    for (const row of arr) {
      this.el.lastElementChild.appendChild(row);
    }
  };

  function createRow(arr, node) {
    let element = document.createElement(node);

    for (const obj of arr) {
      let tr = document.createElement('tr');
  
      for (const key in obj) {
        let td = document.createElement('td');

        td.textContent = node === 'thead' ? key[0].toUpperCase() + key.slice(1) : obj[key];

        tr.appendChild(td);
      }
  
      element.appendChild(tr);

      if (node === 'thead') break;
    }

    return element;
  }
}
