window.addEventListener("load", function () {
  let tabla = document.getElementById("tabla");
  tabla.setAttribute("id", "tabla_id");
  let tbody = document.createElement("tbody");
  tabla.appendChild(tbody);
  this.getDatos();
});

function $(id) {
  return document.getElementById(id);
}

function getDatos() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var personas = this.response;
      let array = JSON.parse(personas);
      array.forEach((element) => {
        llenarTabla(element);
      });
    }
  };
  xhttp.open("GET", "http://localhost:3000/personas", true);
  xhttp.send();
}

function post_editar(url, formData) {
  console.log(formData);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      $("divSpinner").hidden = true;
      var persona = this.response;
      console.log(this.response);
      replacePersona(JSON.parse(persona));
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(formData);
}

function llenarTabla(personas) {
  let nombre = personas.nombre;
  let apellido = personas.apellido;
  let sexo = personas.sexo;
  let id = personas.id;
  let fecha = personas.fecha;

  let tabla = document.getElementById("tabla_id");

  let fila = document.createElement("tr");
  fila.setAttribute("id", personas.id);

  let data1 = document.createElement("td");
  data1.appendChild(document.createTextNode(id));
  fila.appendChild(data1);

  let celda1 = document.createElement("td");
  celda1.appendChild(document.createTextNode(nombre));
  fila.appendChild(celda1);

  let row_2_data_2 = document.createElement("td");
  row_2_data_2.appendChild(document.createTextNode(apellido));
  fila.appendChild(row_2_data_2);

  let row_2_data_5 = document.createElement("td");
  row_2_data_5.appendChild(document.createTextNode(fecha));
  fila.appendChild(row_2_data_5);

  let row_2_data_3 = document.createElement("td");
  row_2_data_3.appendChild(document.createTextNode(sexo));
  fila.appendChild(row_2_data_3);

  fila.ondblclick = function (event) {
    asignarDblClick(personas);
  };

  tabla.appendChild(fila);
}

function asignarDblClick(persona) {
  var dialog = document.getElementById("favDialog");
  dialog.show();

  document.getElementById("id").value = persona.id;
  document.getElementById("name").value = persona.nombre;
  document.getElementById("lastname").value = persona.apellido;
  if (persona.sexo == "Male") {
    document.getElementById("Male").checked = true;
  } else {
    document.getElementById("Female").checked = true;
  }
  document.getElementById("date").value = persona.fecha;
}

function replacePersona(persona) {
  let nombre = persona.nombre;
  let apellido = persona.apellido;
  let sexo = persona.sexo;
  let id = persona.id;
  let fecha = persona.fecha;
  console.log(persona.id);

  var fila = document.getElementById(persona.id);
  /* 
  
  let data1 = document.createElement("td");
  data1.appendChild(document.createTextNode(nombre));
  fila.childNodes[1].replaceWith(data1); */

  // var fila = document.getElementById(persona.id);

  let fila_nueva = document.createElement("tr");
  fila_nueva.setAttribute("id", persona.id);

  let data1 = document.createElement("td");
  data1.appendChild(document.createTextNode(id));
  let data2 = document.createElement("td");
  data2.appendChild(document.createTextNode(nombre));
  let data3 = document.createElement("td");
  data3.appendChild(document.createTextNode(apellido));
  let data4 = document.createElement("td");
  data4.appendChild(document.createTextNode(fecha));
  let data5 = document.createElement("td");
  data5.appendChild(document.createTextNode(sexo));
  fila_nueva.appendChild(data1);
  fila_nueva.appendChild(data2);
  fila_nueva.appendChild(data3);
  fila_nueva.appendChild(data4);
  fila_nueva.appendChild(data5);
  fila_nueva.ondblclick = function (event) {
    asignarDblClick(persona);
  };

  fila.replaceWith(fila_nueva);
  closeDialog();
}

function closeDialog() {
  var dialogoPregunta = document.getElementById("favDialog");
  dialogoPregunta.close();
  cleanErrors();
}

function modificarPersona() {
  let persona = { id: 0, nombre: "", apellido: "", fecha: "", sexo: "" };
  persona.id = document.getElementById("id").value;
  persona.nombre = document.getElementById("name").value;
  persona.apellido = document.getElementById("lastname").value;
  persona.fecha = document.getElementById("date").value;
  if (document.getElementById("Male").checked) {
    persona.sexo = "Male";
  } else {
    persona.sexo = "Female";
  }
  if (validarDatos()) {
    cleanErrors();
    post_editar("http://localhost:3000/editar", JSON.stringify(persona));
    $("divSpinner").hidden = false;
  }
}

function validarDatos() {
  var retorno = true;
  if (document.getElementById("name").value.length < 3) {
    document.getElementById("name").classList.add("validate-wrong");
    retorno = false;
  }
  if (document.getElementById("lastname").value.length < 3) {
    document.getElementById("lastname").classList.add("validate-wrong");
    retorno = false;
  }
  var hoy = new Date(
    new Date().toLocaleDateString("en-US", {
      timeZone: "America/Buenos_Aires",
    })
  )
    .toISOString()
    .slice(0, 10);
  if (document.getElementById("date").value >= hoy) {
    document.getElementById("date").classList.add("validate-wrong");
    retorno = false;
  }
  return retorno;
}

function cleanErrors() {
  if (document.getElementById("name").classList.contains("validate-wrong")) {
    document.getElementById("name").classList.remove("validate-wrong");
  }
  if (
    document.getElementById("lastname").classList.contains("validate-wrong")
  ) {
    document.getElementById("lastname").classList.remove("validate-wrong");
  }
  if (document.getElementById("date").classList.contains("validate-wrong")) {
    document.getElementById("date").classList.remove("validate-wrong");
  }
}

function post_eliminar(url, formData) {
  console.log(formData);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      borrarFila(JSON.parse(formData));
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(formData);
}

function eliminarPersona() {
  let persona = { id: 0 };
  persona.id = document.getElementById("id").value;
  post_eliminar("http://localhost:3000/eliminar", JSON.stringify(persona));
  $("divSpinner").hidden = false;
}

function borrarFila(persona) {
  $("divSpinner").hidden = true;
  console.log(persona);
  var fila = document.getElementById(persona.id);
  var tabla = document.getElementById("tabla_id");
  tabla.removeChild(fila);
  document.getElementById("favDialog").close();
}
