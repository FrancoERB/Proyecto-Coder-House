let nombre = prompt(`Ingrese su nombre y apellido`);
let ingresosMensuales = parseInt(prompt(`Declare sus ingreses mensuales`))
let interes = 0
let montoTotal = 0
let totalCuotas = 0
let montoSolicitado = 0

if (ingresosMensuales >= 70000) {
  alert(`Felicidades ${nombre}, usted está habilitado para acceder a un credito`)
  montoSolicitado = parseInt(prompt(`Ingrese un monto que desea solicitar`))
  calcularInteres()


} else {
  alert(`Usted no cumple los requisitos minimos para acceder a un credito.`)
}

// Funcion para validar cantidad de cuotas y calcular el interes //
function calcularInteres() {

  let coutas = parseInt(prompt(`Ingrese cantidad de coutas, pueden ser 3,6,9 o 12`))
  while (coutas !== 3 && coutas !== 6 && coutas !== 9 && coutas !== 12) {
    alert(`Ingrese una cantidad valida.`)
    coutas = parseInt(prompt(`Ingrese cantidad de coutas`))
  }
  switch (coutas) {
    case (3):
      interes = (montoSolicitado * 21) / 100
      montoTotal = montoSolicitado + interes
      totalCuotas = montoTotal / coutas
      alert(`Felicidades, ${nombre} su prestamo por $${montoSolicitado} fue aprobado. El mismo se devolvera en ${coutas} cuotas de $${parseFloat(totalCuotas).toFixed(2)} final por mes, haciendo en total de $${montoTotal}`)
      break

    case (6):
      interes = (montoSolicitado * 26) / 100
      montoTotal = montoSolicitado + interes
      totalCuotas = montoTotal / coutas
      alert(`Felicidades, ${nombre} su prestamo por $${montoSolicitado} fue aprobado. El mismo se devolvera en ${coutas} cuotas de $${parseFloat(totalCuotas).toFixed(2)} final por mes, haciendo en total de $${montoTotal}`)
      break

    case (9):
      interes = (montoSolicitado * 40) / 100
      montoTotal = montoSolicitado + interes
      totalCuotas = montoTotal / coutas
      alert(`Felicidades, ${nombre} su prestamo por $${montoSolicitado} fue aprobado. El mismo se devolvera en ${coutas} cuotas de $${parseFloat(totalCuotas).toFixed(2)} final por mes, haciendo en total de $${montoTotal}`)
      break

    case (12):
      interes = (montoSolicitado * 60) / 100
      montoTotal = montoSolicitado + interes
      totalCuotas = montoTotal / coutas
      alert(`Felicidades, ${nombre} su prestamo por $${montoSolicitado} fue aprobado. El mismo se devolvera en ${coutas} cuotas de $${parseFloat(totalCuotas).toFixed(2)} final por mes, haciendo en total de $${montoTotal}`)
      break
  }

}






