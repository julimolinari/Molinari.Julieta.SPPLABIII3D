import Anuncio from "./anuncio.js";

export default class Anuncio_Auto extends Anuncio {
  constructor(id, titulo, descripcion, precio, transaccion,num_puertas,num_KMs,potencia){

    super(id, titulo, descripcion, precio, transaccion);
   this.num_puertas = num_puertas;
    this.num_KMs = num_KMs;
    this.potencia = potencia;
  }

}