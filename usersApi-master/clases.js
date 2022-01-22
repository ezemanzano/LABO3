class Persona {
  constructor(id, nombre, apellido) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
  }
}

class Cliente extends Persona {
  constructor(id, nombre, apellido, edad, sexo) {
    super(id, nombre, apellido);
    this.edad = edad;
    this.sexo = sexo;
  }
}
