class AdministrarCitas {
  constructor() {
    this.citas = [];
    this.editando = false;
  }

  agregarCita(cita) {
    if (this.editando) {
      //Edite
      return;
    }
    //Agregando
    this.citas.push({...cita, id: Date.now()});
  }

  eliminar(id){
    this.citas = this.citas.filter(cita => cita.id != id)
  }

  actualizar(cita){
    const citaActualizar = this.cita.find(cita => cita.id == id)
    citaActualizar.mascota = cita.mascota
  }

}


class UI {
  imprimirCitas(citas, contenedor) {
    contenedor.innerHtml = "";

    citas.forEach((cita) => {
      contenedor.innerHtml += `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${cita.mascota}</h5>
        <p class="card-text">
        <span>Propietario: ${cita.propietario}</span>
        <span>Telefono: ${cita.telefono}</span>
        <span>Fecha: ${cita.fecha}</span>
        <span>Hora: ${cita.hora}</span>
        <span>Sintomas: ${cita.sintomas}</span>
        </p>
        <button class="btn btn-primary" >Editar</button>
        <button class="btn btn-danger" onclick="eliminarCita(${cita.id})">Editar</button>
      </div>
    </div>
    `;
    });
  }
}


const administrarCitas = new AdministrarCitas();
const administrarUI = new UI();

//Selectores

const mascota = document.getElementById("name_pet");
const propietario = document.getElementById("name_person");
const telefono = document.getElementById("phone_number");
const fecha = document.getElementById("date_cite");
const hora = document.getElementById("time_cite");
const sintomas = document.getElementById("description");
const contenedor = document.querySelector(".container-citas")
const formulario = document.querySelector("form")



//Eventos

formulario.addEventListener("submit", (event)=> {
    event.preventDefault()

    const nuevaCita = {

        mascota: mascota.value,
        propietario: propietario.value,
        telefono: telefono.value,
        fecha: fecha.value,
        hora: hora.value,
        sintomas: sintomas.value
    }
    
    //Agregar una cita
    administrarCitas.agregarCita(nuevaCita)
    
    //Muestro las citas en pantalla
    administrarUI.imprimirCitas(administrarCitas.citas, contenedor)
    
    //Reinicio formulario
    formulario.reset()

    //Le quito la clase de Bootstrap
    formulario.classList.remove('was-validated')
    console.log(administrarCitas.citas);

})


//Funciones

function actualizarCita(){
    administrarCitas.actualizar(id)
    administrarUI.imprimirCitas(administrarCitas.citas, contenedor)
}


function eliminarCita(){
    administrarCitas.eliminar(id)
    administrarUI.imprimirCitas(administrarCitas.citas, contenedor)
}