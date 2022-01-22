function validarDni() {
  var documento = document.getElementById("dni").value;
  console.log(documento);
  if (!isNaN(documento) && documento.length > 0) {
    alert("Bravo!");
  } else {
    alert("El dni debe ser formado por digitos solamente");
  }
}

function IntercambiarDatos() {
  var apellido = document.getElementById("lastname").value;
  var nombre = document.getElementById("user").value;
  document.getElementById("lastname").value = nombre;
  document.getElementById("user").value = apellido;
}

function Limpiar() {
  document.getElementById("user").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("dni").value = "";
}

window.addEventListener("load", function () {
  alert("Entre aca rey");
  let btn = document.getElementById("btn_validar_2");
  btn.addEventListener("click", validarDni2);
});

function validarDni2() {
  var documento = document.getElementById("dni").value;
  console.log(documento);
  if (!isNaN(documento) && documento.length > 0) {
    alert("Bravo!");
  } else {
    alert("El dni debe ser formado por digitos solamente");
  }
}
