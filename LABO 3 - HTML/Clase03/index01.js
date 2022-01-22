function Limpiar() {
  document.getElementById("user").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("dni").value = "";
}

class Persona {
  constructor(nombre, apellido, dni) {
    this.nombre = nombre;
    this.ancho = apellido;
    this.dni = dni;
  }
}

window.addEventListener("load", function () {
  let table = document.createElement("table");
  table.setAttribute("id", "tabla_id");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById("tabla").appendChild(table);
  let row_1 = document.createElement("tr");
  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "Nombre";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "Apellido";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "Dni";
  let heading_4 = document.createElement("th");
  heading_4.innerHTML = "Accion";
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  thead.appendChild(row_1);
});

function crearTabla() {
  let nombre = document.getElementById("user").value;
  let apellido = document.getElementById("lastname").value;
  let dni = document.getElementById("dni").value;
  let tabla = document.getElementById("tabla_id");

  let fila = document.createElement("tr");
  let celda1 = document.createElement("td");
  celda1.appendChild(document.createTextNode(nombre));
  fila.appendChild(celda1);
  let row_2_data_2 = document.createElement("td");
  row_2_data_2.appendChild(document.createTextNode(apellido));
  fila.appendChild(row_2_data_2);
  let row_2_data_3 = document.createElement("td");
  row_2_data_3.appendChild(document.createTextNode(dni));
  fila.appendChild(row_2_data_3);

  let row_2_data_4 = document.createElement("td");
  let borrar = document.createElement("button");
  borrar.setAttribute("idFila", dni);
  borrar.appendChild(document.createTextNode("Borrar"));
  borrar.addEventListener("click", eliminarFila);
  row_2_data_4.appendChild(borrar);
  fila.appendChild(row_2_data_4);
  fila.setAttribute("id", dni);
  tabla.appendChild(fila);
}

function eliminarFila(event) {
  let btn = event.target;
  let idFila = btn.getAttribute("idFila");
  let fila = document.getElementById(idFila);
  let tabla = document.getElementById("tabla_id");
  tabla.removeChild(fila);
}
