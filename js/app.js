const namePetInput = document.getElementById("name_pet");
const namePersonInput = document.getElementById("name_person");
const phonePersonInput = document.getElementById("phone_number");
const tipoPetInput = document.getElementById("type_pet");
const dateCiteInput = document.getElementById("date_cite");
const timeCiteInput = document.getElementById("time_cite");
const descriptionInput = document.getElementById("description");
const contenedorCard = document.getElementById("contenedor-cards");

let formulario = document.querySelector("form");
let actualizando = false
let idMascotaEliminar;
let lista_mascotas = [];

document.addEventListener("DOMContentLoaded", () => {
    let mascotaAgendadaLocalStorage = localStorage.getItem("mascotaAgendada")
    if(mascotaAgendadaLocalStorage){
        lista_mascotas = JSON.parse(mascotaAgendadaLocalStorage)
        llamarInfo()
       
    }
})

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const mascotas = {
        id: self.crypto.randomUUID(),
        nombre: namePetInput.value,
        propietario: namePersonInput.value,
        telefono: phonePersonInput.value,
        tipo: tipoPetInput.value,
        fecha: dateCiteInput.value,
        hora: timeCiteInput.value,
        sintomas: descriptionInput.value,
    };


    const vacio = Object.keys(mascotas).some(key => mascotas[key] == "")

    if (vacio) return


    if (actualizando) {
        lista_mascotas = lista_mascotas.filter(mascota => mascota.id != idMascotaEliminar)
    }

    lista_mascotas.push(mascotas);

    llamarInfo();
    actualizando = false
    namePetInput.disabled = false
    formulario.reset()
    formulario.classList.remove('was-validated')
});

function llamarInfo() {
    contenedorCard.innerHTML = "";

    lista_mascotas.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        const horaA = a.hora;
        const horaB = b.hora;

        if (fechaA.getTime() !== fechaB.getTime()) {
            return fechaA.getTime() - fechaB.getTime();
        } else {
            return horaA.localeCompare(horaB);
        }
    });


    lista_mascotas.forEach((mascotas) => {
        contenedorCard.innerHTML += `
    <br>
    <div class="card col-md-6">
        <div class="card-header text-center" id="confirmNamePet">${mascotas.nombre}</div>
        <div class="card-body">
        <h6 class="card-subtitle mb-2 text-body" id="confirmName">
        ${mascotas.propietario}
        </h6>
        <h6 class="card-subtitle mb-2 text-body" id="confirmPhone">
        ${mascotas.tipo}
        </h6>
        <h6 class="card-subtitle mb-2 text-body" id="confirmPhone">
        ${mascotas.telefono}
        </h6>
        <p class="card-text" id="confirmSymptoms">
        Sintomas: ${mascotas.sintomas}
        </p>
        </div>
        <div class="card-footer text-body-secondary " id="confirmDate">Fecha: ${mascotas.fecha}</div>
        <div class="card-footer text-body-secondary" id="confirmTime">Hora: ${mascotas.hora}</div>
        </div>
        <br>
        <div class= "text-center">
        <button type="submit" class="btn btn-info btn-editar" id-mascota="${mascotas.id}">Editar</button>
        <button type="submit" class="btn btn-danger btn-eliminar " id-mascota="${mascotas.id}">Eliminar</button>
        </div>
    `;
    });

    cargarEventos()
    cargarEditar()

    localStorage.setItem("mascotaAgendada", JSON.stringify(lista_mascotas))

}



function cargarEditar() {
    const botones = document.querySelectorAll(".btn-editar");
    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            const idMascotaEditar = boton.getAttribute("id-mascota")
            const mascotaEditar = lista_mascotas.find(mascota => mascota.id == idMascotaEditar)


            namePetInput.disabled = true
            namePetInput.value = mascotaEditar.nombre
            namePersonInput.value = mascotaEditar.propietario
            phonePersonInput.value = mascotaEditar.telefono
            dateCiteInput.value = mascotaEditar.fecha
            timeCiteInput.value = mascotaEditar.hora
            descriptionInput.value = mascotaEditar.sintomas

            actualizando = true

            idMascotaEliminar = idMascotaEditar
        });
    })
}

function cargarEventos() {
    const botones = document.querySelectorAll(".btn-eliminar");
    botones.forEach(boton => {

        boton.addEventListener("click", () => {
            const idEliminar = boton.getAttribute("id-mascota")
            lista_mascotas = lista_mascotas.filter(mascota => mascota.id != idEliminar)

            llamarInfo()


        });
    })
}