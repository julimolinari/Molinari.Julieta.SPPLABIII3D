import crearTabla from "./tabla.js";
import agregarManejadorTR from "./tabla.js";
import Anuncio from "./anuncio.js";
import Anuncio_Auto from "./Anuncio_Auto.js";

const spinner = document.getElementById("spinner");


let listaAnuncio;
let frmAnuncio;
let proximoId;
let divTabla;
let btnEliminar = document.getElementById('btnEliminar');
let btnCancelar = document.getElementById('btnCancelar');
let btnAltaMod = document.getElementById('btnAltaModif');

btnEliminar.hidden = true;
btnCancelar.hidden = true;

window.addEventListener('load', incializarManejadores);



export default function cargarFormulario() {

    listaAnuncio.forEach(element => {
        if (element.id == JSON.parse(localStorage.getItem('idSeleccionado'))) {
            document.getElementById('txtTitulo').value = element.titulo;

            if (element.transaccion == "Venta") {
                document.getElementById("rdoV").checked = true;
            } else {
                document.getElementById("rdoA").checked = true;
            }
            document.getElementById('txtDescripcion').value = element.descripcion;
            document.getElementById('txtDescripcion').value = element.descripcion;
            document.getElementById('txtPrecio').value = element.precio;
            document.getElementById('num_puertas').value = element.num_puertas;
            document.getElementById('num_kms').value = element.num_KMs;
            document.getElementById('num_potencia').value = element.potencia;


        }
    });

    btnAltaMod.textContent = 'Modificar';
    btnEliminar.hidden = false;
    btnCancelar.hidden = false;

}

btnEliminar.addEventListener('click', function (e) {
    var r = confirm("Eliminar?");
    if (r == true) {
        for (let index = 0; index < listaAnuncio.length; index++) {
            const element = listaAnuncio[index];
            if (JSON.parse(localStorage.getItem('idSeleccionado')) == element.id) {

                const xhr = new XMLHttpRequest();

                divTabla.innerHTML = "";

                spinner.appendChild(crearSpinner());

                xhr.addEventListener('readystatechange', () => {


                    if (xhr.readyState == 4) {

                        if (xhr.status >= 200 && xhr.status < 300) {
                            //todo ok

                            let datos = JSON.parse(xhr.responseText);

                        } else {
                            //todo mal
                            let msj = xhr.statusText || "Se produjo un error."
                            console.error(("Error: " + xhr.status + " - " + msj));
                        }
                        spinner.innerHTML = "";
                    }

                });
                let id = element.id;

                xhr.open('DELETE', "http://localhost:3000/anuncios/" + id);


                xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
                xhr.send();
            }
        }
    } else {
        limpiarDatosForm();
    }


});



function incializarManejadores() {
    //listaAnuncio = obtenerAnuncio();

    divTabla = document.getElementById("divTabla");

    actualizarLista();
    //traerAnuncios();

    frmAnuncio = document.forms[0];
    frmAnuncio.addEventListener('submit', e => {

        e.preventDefault();
        if (btnAltaMod.textContent == 'Modificar') {

            listaAnuncio.forEach(element => {


                if (element.id == JSON.parse(localStorage.getItem('idSeleccionado'))) {
                    console.log(frmAnuncio.descripcion.value);
                    let anuncioAModificar = {
                        "id": element.id,
                        "titulo": frmAnuncio.titulo.value,
                        "descripcion": frmAnuncio.descripcion.value,
                        "precio": frmAnuncio.precio.value,
                        "transaccion": frmAnuncio.trans.value,
                        "num_puertas": frmAnuncio.num_puertas.value,
                        "num_KMs": frmAnuncio.num_kms.value,
                        "potencia": frmAnuncio.num_potencia.value,
                    };

                    const xhr = new XMLHttpRequest();

                    divTabla.innerHTML = "";

                    // spinner.appendChild(crearSpinner());

                    xhr.addEventListener('readystatechange', () => {


                        if (xhr.readyState == 4) {

                            if (xhr.status >= 200 && xhr.status < 300) {
                                //todo ok

                                let datos = JSON.parse(xhr.responseText);
                                console.log(datos);

                            } else {
                                //todo mal
                                let msj = xhr.statusText || "Se produjo un error."
                                console.error(("Error: " + xhr.status + " - " + msj));
                            }
                            spinner.innerHTML = "";
                        }

                    });
                    let id = element.id;

                    xhr.open('PUT', "http://localhost:3000/anuncios/" + id);


                    xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
                    xhr.send(JSON.stringify(anuncioAModificar));
                    console.log(anuncioAModificar);

                }
            });

            limpiarDatosForm();

            actualizarLista();

        } else {

            const nuevoAnuncio = crearAnuncio();
            console.log(nuevoAnuncio);
            if (nuevoAnuncio) {
                const xhr = new XMLHttpRequest();

                divTabla.innerHTML = "";

                spinner.appendChild(crearSpinner());

                xhr.addEventListener('readystatechange', () => {


                    if (xhr.readyState == 4) {

                        if (xhr.status >= 200 && xhr.status < 300) {
                            //todo ok

                            let datos = JSON.parse(xhr.responseText);

                            console.log(datos);

                        } else {
                            //todo mal
                            let msj = xhr.statusText || "Se produjo un error."
                            console.error(("Error: " + xhr.status + " - " + msj));
                        }
                        spinner.innerHTML = "";
                    }

                });

                xhr.open('POST', "http://localhost:3000/anuncios");


                xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
                xhr.send(JSON.stringify(nuevoAnuncio));


                limpiarDatosForm();
                actualizarLista();
            }
        }

    });
}

function crearAnuncio() {

    let nuevoAnuncio = {
        "id": null,
        "titulo": frmAnuncio.titulo.value,
        "descripcion": frmAnuncio.descripcion.value,
        "precio": frmAnuncio.precio.value,
        "transaccion": frmAnuncio.trans.value,
        "num_puertas": frmAnuncio.num_puertas.value,
        "num_KMs": frmAnuncio.num_kms.value,
        "potencia": frmAnuncio.num_potencia.value,
    };
    return nuevoAnuncio;
}




function actualizarLista() {

    const xhr = new XMLHttpRequest();
    divTabla.innerHTML = "";

    spinner.appendChild(crearSpinner());

    xhr.addEventListener('readystatechange', () => {


        if (xhr.readyState == 4) {

            if (xhr.status >= 200 && xhr.status < 300) {
                //todo ok

                let datos = JSON.parse(xhr.responseText);
                
                divTabla.appendChild(crearTabla(datos));

                listaAnuncio = datos;
                console.log(datos);

            } else {
                //todo mal
                let msj = xhr.statusText || "Se produjo un error."
                console.error(("Error: " + xhr.status + " - " + msj));
            }
            spinner.innerHTML = "";
        }

    });

    xhr.open('GET', "http://localhost:3000/anuncios");

    xhr.send();




}


function limpiarDatosForm() {
    document.getElementById('txtTitulo').value = "";
    document.getElementById('txtDescripcion').value = "";
    document.getElementById('txtPrecio').value = "";
    document.getElementById('num_puertas').value = "";
    document.getElementById('num_kms').value = "";
    document.getElementById('num_potencia').value = "";
    btnAltaMod.textContent = 'Guardar';
    btnEliminar.hidden = true;
    btnCancelar.hidden = true;

}


btnCancelar.addEventListener('click', e => {
    limpiarDatosForm();
})



function crearSpinner() {
    const img = document.createElement('img');
    img.setAttribute("src", "./images/6.gif");
    img.setAttribute("alt", "Imagen de spinner");

    return img;
};


let btnFiltrar = document.getElementById('btnfiltrar');
let btnFiltrarAl = document.getElementById('btnfiltrarAl');
let btnFiltrarTodo = document.getElementById('btnfiltrarTodo');
let precio = document.getElementById('txt_precio');

btnFiltrar.addEventListener('click', function (e) {

    var venta = filtroVenta(listaAnuncio);
    divTabla.innerHTML="";
    
    divTabla.appendChild(crearTabla(venta));
    

})
btnFiltrarTodo.addEventListener('click', function (e) {

    
    divTabla.innerHTML="";
    
    divTabla.appendChild(crearTabla(listaAnuncio));
    precio.value='n/a';
    

})

btnFiltrarAl.addEventListener('click', function (e) {

    var alquiler = filtroAl(listaAnuncio);
    divTabla.innerHTML="";
    
    divTabla.appendChild(crearTabla(alquiler));
    

})

function filtroVenta( lista ) {

    const venta = lista.filter( x => x.transaccion === 'Venta' );
    
    venta.forEach(element => {

        
        var total = venta.length;
        var aux = element.precio;
        var suma = aux + element.precio;
        
        precio.value= aux / total;
    })
    console.log(venta);
    
    return venta;
    // listaAnuncio=venta;   

}


function filtroAl( lista ) {

    const alquiler = lista.filter( x => x.transaccion === 'Alquiler' );
    alquiler.forEach(element => {

        
        var total = alquiler.length;
        var aux = element.precio;
        var suma = aux + element.precio;
        
        precio.value= aux / total;
    })
    
    console.log(alquiler);
    return alquiler;
    // listaAnuncio=alquiler;   

}



