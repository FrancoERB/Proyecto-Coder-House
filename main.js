const mainContainer = document.querySelector(".main")
const inputContainer = document.querySelector(".inputsContainer")
const btn = document.getElementById("btnSiguiente")
const inputName = document.getElementById("nombre");
const inputSalary = document.getElementById("ingresosMensuales");
const inputDni = document.getElementById("dni");
const inputRequestedAmount = document.getElementById("inputMontoSolicitado");
const inputQuotes = document.getElementById("selector");
const dolarText = document.getElementById("dolar")

let prestamos = []
let dni = ""

document.addEventListener("DOMContentLoaded", function () {
  getDolarApi()
});

//Funcion para mostrar alertas//
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

//Funcion para adaptar los datos almacenados del cliente en la tabla
function showData(lista) {
  for (let i in lista) {
    return `
    <tr>
      <td>${lista[i].cliente}</td>
      <td>${lista[i].montoSolicitado}</td>
      <td>${lista[i].dni}</td>
      <td>${lista[i].cantidadCuotas}</td>
      <td>${lista[i].total}</td>
      <td>${lista[i].coutasMensuales}</td>
    </tr> 
  `
  }
}

//Funcion que crea la tabla para mostrar datos de cliente
function createTable(lista) {
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
  ${showData(lista)}
  </table>`
  mainContainer.appendChild(contenedor)
  showButton()
}

//Funcion que crea el boton para limpiar campos//
function showButton() {
  const botonLimpiar = document.createElement("button")
  botonLimpiar.classList.add("btnLimpiar")
  botonLimpiar.innerText = "Limpiar"
  botonLimpiar.addEventListener('click', clearInputs)
  mainContainer.appendChild(botonLimpiar)
}

//Funcion para obtener valor actual del dolar//
const getDolarApi = async () => {
  fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((response) => response.json())
    .then((data) => {
      const { casa } = data[0]
      dolarText.innerText = ` $${casa.compra}`
    })
    .catch((err) => {
      console.log(err)
    })
}

//Funcion para evitar campos vacios//
const isEmptyInput = () => {
  return inputName.value.length > 0 && inputSalary.value.length > 0 && inputDni.value.length > 0 && inputRequestedAmount.value.length > 0
}

//Funcion para verificar si el cliente cumple con los requisitos para acceder a un credito//
function verificarCliente() {
  if (!isEmptyInput()) {
    return mostrarMensaje("error", "No deje campos vacíos")
  }
  let NombreDeCliente = inputName.value
  console.log(NombreDeCliente)
  let ingresosMensuales = inputSalary.value
  dni = inputDni.value

  if (ingresosMensuales < 70000) {
    return mostrarMensaje("error", `${NombreDeCliente} Usted no está habilitado para acceder a un crédito`)
  }
  iniciarPrestamo(NombreDeCliente, 12)
}

//Funcion para calcular interes del prestamos y el total del mismo, tambien almacena los clientes en una lista. //
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
  createTable(prestamos);
}
btn.addEventListener("click", verificarCliente)

//Funcion para limpiar campos//
const clearInputs = () => {
  inputName.value = ''
  inputDni.value = ''
  inputQuotes.value = '3'
  inputRequestedAmount.value = ''
  inputSalary.value = ''
  document.getElementById('table').remove();
  localStorage.clear()
}

//Funcion para obtener clientes de local storage//
const getFromLocalStorage = () => {
  const prestamos = localStorage.getItem("listaDeClientes");
  const data = JSON.parse(prestamos)
  if (data?.length > 0) {
    createTable(data);
  }
}

getFromLocalStorage()


