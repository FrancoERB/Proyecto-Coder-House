const prestamos = []
//método para mostrar alertas//
const mostrarMensaje = (tipoDeMensaje, mensaje) => {
  if (tipoDeMensaje === "success") {
    alert(`Success: ${mensaje}`)
  } else if (tipoDeMensaje === "error") {
    alert(`Error: ${mensaje}`)
  }
}
//Método para verificar si el cliente cumple con los requisitos para acceder a un credito//
function verificarCliente() {

  let NombreDeCliente = prompt("Ingrese su nombre completo")
  let ingresosMensuales = parseFloat(prompt("Ingrese sus ingresos mensuales"))

  if (ingresosMensuales < 70000) {
    return mostrarMensaje("error", `${NombreDeCliente} Usted no está habilitado para acceder a un crédito`)
  }
  mostrarMensaje("success", `${NombreDeCliente} Usted está habilitado para acceder a un crédito`)
  iniciarPrestamo(NombreDeCliente, 12)
}
//Método para calcular interes del prestamos y el total del mismo, tambien almacena los clientes en una lista. //
const iniciarPrestamo = (cliente, interes) => {
  const montoSolicitado = parseFloat(prompt(`${cliente} Ingresá el monto a solicitar`))
  const cantidadCuotas = parseFloat(prompt(`${cliente} Ingresá la cantidad de cuotas 3,6,9 o 12`))
  const total = (montoSolicitado * (interes * cantidadCuotas)) / 100 + montoSolicitado
  const coutasMensuales = total / cantidadCuotas
  mostrarMensaje("success", `Su prestamo fue aprobado, el total a pagar es: ${parseFloat(total).toFixed(2)} en ${cantidadCuotas} cuotas de: ${parseFloat(coutasMensuales).toFixed(2)}`)
  prestamos.push({
    cliente, montoSolicitado, cantidadCuotas, total, coutasMensuales
  });
  const respuesta = prompt("¿Desea solicitar otro prestamo? (S/N)")
  if (respuesta === "S" || respuesta === "s") {
    return verificarCliente()
  } else {
    console.table(prestamos)
  }
}
verificarCliente()
