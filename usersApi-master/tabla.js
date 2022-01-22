var personas = [];

window.addEventListener("load", function () {
  llenarSelect();
  llenarSelectFiltro();
  getClientes();
  document.getElementById("id").disabled = true;
  document.getElementById("prom").disabled = true;
});

function $(id) {
  return document.getElementById(id);
}

function llenarSelect() {
  let select = $("sexo");
  let opcion = document.createElement("option");
  opcion.innerHTML = "Femenino";
  opcion.value = "Female";
  let opcion2 = document.createElement("option");
  opcion2.innerHTML = "Masculino";
  opcion2.value = "Male";
  select.appendChild(opcion);
  select.appendChild(opcion2);
}

function llenarSelectFiltro() {
  let select_filtro = $("sexo_filtro");
  let opcion = document.createElement("option");
  opcion.innerHTML = "Femenino";
  opcion.value = "Female";
  let opcion2 = document.createElement("option");
  opcion2.innerHTML = "Masculino";
  opcion2.value = "Male";
  select_filtro.appendChild(opcion);
  select_filtro.appendChild(opcion2);
}

function getClientes() {
  promesa = new Promise(getDatos);
  promesa.then(getDatosExitoso).catch(errorGetDatos);
}

async function getDatos(exito, error) {
  try {
    let respuesta = await fetch("http://localhost:3001/clientes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response Status:" + respuesta.status.toString());
    respuesta.json().then((elementos) => {
      exito(elementos);
    });
  } catch (error) {
    console.log("Con Error:" + error);
  }
}

function getDatosExitoso(exito) {
  exito.forEach((element) => {
    let cliente = new Cliente(
      element.id,
      element.nombre,
      element.apellido,
      element.edad,
      element.sexo
    );
    personas.push(cliente);
  });
  llenarTabla(personas);
}

function errorGetDatos() {
  alert("Error al cargar la tabla - Chequear API");
}

function llenarFila(personas) {
  let id = personas.id;
  let nombre = personas.nombre;
  let apellido = personas.apellido;
  let sexo = personas.sexo;
  let edad = personas.edad;

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
  data4.appendChild(document.createTextNode(edad));
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

function vaciarTabla() {
  let node = document.getElementById("body_id");
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function agregarCliente() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var sexo = document.getElementById("sexo").value;
  var edad = document.getElementById("edad").value;

  let id = 0;
  personas.forEach((persona) => {
    if (persona.id > id) {
      id = persona.id;
    }
  });
  if (nombre != "" && apellido != "" && sexo != "" && edad != "") {
    var newCliente = new Cliente(id + 1, nombre, apellido, edad, sexo);
    personas.push(newCliente);
    llenarTabla(personas);
  } else {
    alert("Debe completar todos los campos");
  }
}

function cleanData() {
  document.getElementById("id").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("sexo").value = "";
  document.getElementById("edad").value = "";
}

function asignarClick(persona) {
  document.getElementById("id").value = persona.id;
  document.getElementById("nombre").value = persona.nombre;
  document.getElementById("apellido").value = persona.apellido;
  document.getElementById("edad").value = persona.edad;
  if (persona.sexo == "Male") {
    document.getElementById("sexo").selectedIndex = 1;
  } else {
    document.getElementById("sexo").selectedIndex = 0;
  }
}

function eliminarPersona() {
  var id = document.getElementById("id").value;
  var flag = false;

  personas.forEach((element, index) => {
    if (element.id == id) {
      flag = true;
      personas.splice(index, 1);
    }
  });
  if (!flag) {
    alert("No se encontró el id");
  }
  llenarTabla(personas);
}

function calcularPromedio() {
  var total = 0;
  total = personas.reduce((sum, per) => sum + parseInt(per.edad), 0);
  total = total / personas.length;
  document.getElementById("prom").value = total;
}

function filtrarTabla() {
  var sexo_selected = document.getElementById("sexo_filtro").value;
  personas2 = personas.filter((persona) => persona.sexo == sexo_selected);
  llenarTabla(personas2);
}

function LimpiarFiltro() {
  llenarTabla(personas);
}

function CambiarEstadoColumna(numero) {
  var columnaID;
  switch (numero) {
    case 0:
      columnaID = document.getElementById("cb_id");
      break;

    case 1:
      columnaID = document.getElementById("cb_nombre");
      break;

    case 2:
      columnaID = document.getElementById("cb_apellido");
      break;

    case 3:
      columnaID = document.getElementById("cb_edad");
      break;
  }
  if (columnaID.checked) {
    stl = "table-cell";
  } else {
    stl = "none";
  }
  var tbl = document.getElementById("tabla");
  var th = tbl.getElementsByTagName("th");
  var rows = tbl.getElementsByTagName("tr");
  th[numero].style.display = stl;
  for (var row = 1; row < rows.length; row++) {
    var cels = rows[row].getElementsByTagName("td");
    cels[numero].style.display = stl;
  }
}
