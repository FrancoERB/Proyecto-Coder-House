const mainContainer = document.querySelector(".main")
const inputContainer = document.querySelector(".inputsContainer")
const btn = document.getElementById("btnSiguiente")
const inputName = document.getElementById("nombre");
const inputSalary = document.getElementById("ingresosMensuales");
const inputDni = document.getElementById("dni");
const inputRequestedAmount = document.getElementById("inputMontoSolicitado");
const inputQuotes = document.getElementById("selector");

const prestamos = []
let dni = ""
//método para mostrar alertas//
const mostrarMensaje = (tipoDeMensaje, mensaje) => {
  if (tipoDeMensaje === "success") {
    Toastify({
      text: mensaje,
      duration: 9000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#25bf2b",
      },
    }).showToast();
  } else if (tipoDeMensaje === "error") {
    Toastify({
      text: mensaje,
      duration: 9000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ff0000",
      },
    }).showToast();
  }
}

//Metodo para adaptar los datos almacenados del cliente en la tabla
function showData() {
  for (let i in prestamos) {
    return `
    <tr>
      <td>${prestamos[i].cliente}</td>
      <td>${prestamos[i].montoSolicitado}</td>
      <td>${prestamos[i].dni}</td>
      <td>${prestamos[i].cantidadCuotas}</td>
      <td>${prestamos[i].total}</td>
      <td>${prestamos[i].coutasMensuales}</td>
    </tr> 
  `
  }
}

//Funcion que crea la tabla para mostrar datos de cliente
function createTable() {
  const contenedor = document.createElement("div")
  contenedor.classList.add("tableContainer")
  contenedor.setAttribute('id', 'table')
  contenedor.innerHTML =
    `<table cellspacing="5" cellpadding="5" border="2">
    <tr>
    <th>Nombre Completo</th>
    <th>Monto solicitado</th>
    <th>DNI</th>
    <th>Cantidad de coutas</th>
    <th>total</th>
    <th>Coutas Mensuales</th>
  </tr>
  ${showData()}
  </table>`
  mainContainer.appendChild(contenedor)
  showButton()
}

//Metodo que crea el boton para limpiar campos//
function showButton() {
  const botonLimpiar = document.createElement("button")
  botonLimpiar.classList.add("btnLimpiar")
  botonLimpiar.innerText = "Limpiar"
  botonLimpiar.addEventListener('click', clearInputs)
  mainContainer.appendChild(botonLimpiar)
}

//Método para verificar si el cliente cumple con los requisitos para acceder a un credito//
function verificarCliente() {
  let NombreDeCliente = inputName.value
  console.log(NombreDeCliente)
  let ingresosMensuales = inputSalary.value
  dni = inputDni.value

  if (ingresosMensuales < 70000) {
    return mostrarMensaje("error", `${NombreDeCliente} Usted no está habilitado para acceder a un crédito`)
  }
  iniciarPrestamo(NombreDeCliente, 12)
}

//Método para calcular interes del prestamos y el total del mismo, tambien almacena los clientes en una lista. //
const iniciarPrestamo = (cliente, interes) => {
  const montoSolicitado = parseInt(inputRequestedAmount.value)
  const cantidadCuotas = parseInt(inputQuotes.value)
  const total = (montoSolicitado * (interes * cantidadCuotas)) / 100 + montoSolicitado
  const coutasMensuales = parseFloat(total / cantidadCuotas).toFixed(2)
  mostrarMensaje("success", `Su prestamo fue aprobado, el total a pagar es: ${parseFloat(total).toFixed(2)} en ${cantidadCuotas} cuotas de: ${parseFloat(coutasMensuales).toFixed(2)}`)
  prestamos.push({
    cliente, montoSolicitado, dni, cantidadCuotas, total, coutasMensuales
  });
  localStorage.setItem("listaDeClientes", JSON.stringify(prestamos))
  createTable();
}
btn.addEventListener("click", verificarCliente)

const clearInputs = () => {
  inputName.value = ''
  inputDni.value = ''
  inputQuotes.value = '3'
  inputRequestedAmount.value = ''
  inputSalary.value = ''
  document.getElementById('table').remove();
}

