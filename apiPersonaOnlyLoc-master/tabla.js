var localidades = [];
var personas = [];

window.addEventListener("load", function () {
  let tabla = document.getElementById("tabla");
  tabla.setAttribute("id", "tabla_id");
  this.getPersonas();
  this.getLocalidadesPromesa();
});

function $(id) {
  return document.getElementById(id);
}

function getPersonas() {
  promesa = new Promise(getDatos);
  promesa.then(getDatosExitoso).catch(errorGetDatos);
}

async function getDatos(exito, error) {
  try {
    let respuesta = await fetch("http://localhost:3000/personas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response Status:" + respuesta.status.toString());
    respuesta.json().then((elementos) => {
      personas = elementos;
      exito(personas);
    }); //intenta convertir la respuesta en jsons
    //respuesta.text().then((texto)=>{console.log(texto)});//intenta convertir la respuesta en texto
  } catch (error) {
    console.log("Con Error:" + error);
  }
}
function getDatosExitoso(exito) {
  llenarTabla(exito);
}

function errorGetDatos() {
  alert("Error al cargar la tabla - Chequear API");
}

function getLocalidadesPromesa() {
  promesa = new Promise(getLocalidades);
  promesa.then(getLocalidadesExitoso).catch(errorGetDatos);
}

function getLocalidades(exito, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      exito(JSON.parse(this.response));
    }
    if (this.readyState == 4 && this.status == 404) {
      error(false);
    }
  };
  xhttp.open("GET", "http://localhost:3000/localidades", true);
  xhttp.send();
}

function getLocalidadesExitoso(exito) {
  localidades = exito;
  localidades.forEach((element) => {
    llenarSelect(element);
  });
}

function llenarSelect(localidad) {
  let select = $("localidades");
  let select_filtro = $("filtro_localidades");
  let nombre_localidad = localidad.nombre;
  let id_localidad = localidad.id;

  let opcion = document.createElement("option");
  opcion.innerHTML = nombre_localidad;
  opcion.value = id_localidad;
  let opcion2 = document.createElement("option");
  opcion2.innerHTML = nombre_localidad;
  opcion2.value = id_localidad;
  select.appendChild(opcion);
  select_filtro.appendChild(opcion2);
}

function llenarFila(personas) {
  let nombre = personas.nombre;
  let apellido = personas.apellido;
  let sexo = personas.sexo;
  let id = personas.id;
  let localidad = personas.localidad;

  let tabla = document.getElementById("body_id");
  let fila = document.createElement("tr");
  fila.setAttribute("id", personas.id);
  let data1 = document.createElement("td");
  data1.appendChild(document.createTextNode(id));
  fila.appendChild(data1);
  let data2 = document.createElement("td");
  data2.appendChild(document.createTextNode(nombre));
  fila.appendChild(data2);
  let data3 = document.createElement("td");
  data3.appendChild(document.createTextNode(apellido));
  fila.appendChild(data3);
  let data4 = document.createElement("td");
  data4.appendChild(document.createTextNode(localidad.nombre));
  fila.appendChild(data4);

  let data5 = document.createElement("td");
  data5.appendChild(document.createTextNode(sexo));
  fila.appendChild(data5);

  fila.onclick = function (event) {
    asignarClick(personas);
  };

  tabla.appendChild(fila);
}

function llenarTabla(elementos) {
  vaciarTabla();
  elementos.forEach((element) => {
    llenarFila(element);
  });
}

function asignarClick(persona) {
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

  var i = 0;
  localidades.forEach((element) => {
    if (element.id == persona.localidad.id) {
      document.getElementById("localidades").selectedIndex = i;
    }
    i++;
  });
}

function closeDialog() {
  var dialogoPregunta = document.getElementById("favDialog");
  dialogoPregunta.close();
  cleanErrors();
}

function modificarPersona() {
  let persona = { id: 0, nombre: "", apellido: "", localidad: {}, sexo: "" };
  persona.id = document.getElementById("id").value;
  persona.nombre = document.getElementById("name").value;
  persona.apellido = document.getElementById("lastname").value;
  if (document.getElementById("Male").checked) {
    persona.sexo = "Male";
  } else {
    persona.sexo = "Female";
  }
  var localidad_selected = document.getElementById("localidades").value;
  localidades.forEach((element) => {
    if (element.id == localidad_selected) {
      persona.localidad = element;
    }
  });

  if (validarDatos()) {
    cleanErrors();
    post_editar("http://localhost:3000/editar", JSON.stringify(persona));
    $("divSpinner").hidden = false;
  }
}
async function post_editar(url, formData) {
  var xhttp = new XMLHttpRequest();
  let resultado;
  let promise = new Promise((exito, fallo) => {
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("divSpinner").hidden = true;
        var persona = this.response;
        replacePersona(JSON.parse(persona));
        exito("Se modificó correctamente");
      }
      if (this.readyState == 4 && this.status == 404) {
        fallo("Error");
      }
    };
  });
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(formData);
  resultado = await promise.then(exitoModif).catch(errorModif);

  return resultado;
}

function exitoModif(exito) {
  console.log(exito);
}

function errorModif(fallo) {
  console.log(fallo);
}

function replacePersona(persona) {
  let nombre = persona.nombre;
  let apellido = persona.apellido;
  let sexo = persona.sexo;
  let id = persona.id;
  let localidad = persona.localidad;

  var fila = document.getElementById(persona.id);
  let fila_nueva = document.createElement("tr");
  fila_nueva.setAttribute("id", persona.id);

  let data1 = document.createElement("td");
  data1.appendChild(document.createTextNode(id));
  let data2 = document.createElement("td");
  data2.appendChild(document.createTextNode(nombre));
  let data3 = document.createElement("td");
  data3.appendChild(document.createTextNode(apellido));
  let data4 = document.createElement("td");
  data4.appendChild(document.createTextNode(localidad.nombre));
  let data5 = document.createElement("td");
  data5.appendChild(document.createTextNode(sexo));
  fila_nueva.appendChild(data1);
  fila_nueva.appendChild(data2);
  fila_nueva.appendChild(data3);
  fila_nueva.appendChild(data4);
  fila_nueva.appendChild(data5);
  fila_nueva.ondblclick = function (event) {
    asignarClick(persona);
  };

  fila.replaceWith(fila_nueva);
  closeDialog();
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

  if (
    !document.getElementById("Male").checked &&
    !document.getElementById("Female").checked
  ) {
    document.getElementById("Male").classList.add("validate-wrong");
    document.getElementById("Female").classList.add("validate-wrong");
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

  if (
    document.getElementById("Male").classList.contains("validate-wrong") &&
    document.getElementById("Female").classList.contains("validate-wrong")
  ) {
    document.getElementById("Male").classList.remove("validate-wrong");
    document.getElementById("Female").classList.remove("validate-wrong");
  }
}

function filtrarTabla() {
  var localidad_selected = document.getElementById("filtro_localidades").value;
  personas2 = personas.filter(
    (persona) => persona.localidad.id == localidad_selected
  );

  llenarTabla(personas2);
}

function vaciarTabla() {
  let node = document.getElementById("body_id");
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}
