import cargarFormulario from "./scripts.js";


let idSeleccionado;


export default function crearTabla(lista){
    const tabla = document.createElement('table');
    tabla.setAttribute("id","Tabla");
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));


    return tabla;
}


function crearCabecera(item){
    
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) {
        const th = document.createElement('th');
        
        const texto = document.createTextNode(key);
        th.appendChild(texto);

        tr.appendChild(th);                  
    }

    thead.appendChild(tr);

    return thead;

}


function crearCuerpo(lista){
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
        const tr = document.createElement('tr');        
     
        for (const key in element) { 
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);  
            td.appendChild(texto);   
            tr.appendChild(td);        
        }


        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id',element['id']);
            
        }     

        agregarManejadorTR(tr);
        tbody.appendChild(tr);        
    });

    return tbody;
}



function agregarManejadorTR(tr){    
    if(tr){
           tr.addEventListener('click',function(e){            
            idSeleccionado = e.target.parentElement.getAttribute('data-id');
            console.log(idSeleccionado);            

            localStorage.setItem('idSeleccionado',idSeleccionado);
            cargarFormulario();
           
            
          
        });
    }    
}


