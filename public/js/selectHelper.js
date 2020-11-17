
function obtenerTipo(arr) {
    return arr.map(obj => obj.tipo)
        .unique()
        .sort();
}

function obtenerTransaccion(arr) {
    return arr.map(obj => obj.transaccion)
        .unique()
        .sort();
}

function cargarSelect(sel, arr) {
    limpiarSelect(sel);
    let option = document.createElement('option');
    option.value = "Todos";
    option.textContent = "Todos";
    sel.appendChild(option);
    arr.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        sel.appendChild(option);
    });
}

function limpiarSelect(sel) {
    sel.options.length = 0;
}


Array.prototype.unique = function() {
    return [...new Set(this)];
}