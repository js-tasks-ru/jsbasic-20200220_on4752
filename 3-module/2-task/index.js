/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
    let arr = [];

    for ( let item of str.split(/,| /) ) {
        if ( !isNaN( parseFloat(item) ) ) {
            arr.push( parseFloat(item) );
        };
    }

    return {
        min: Math.min.apply( null, arr ),
        max: Math.max.apply( null, arr ),
    }
}