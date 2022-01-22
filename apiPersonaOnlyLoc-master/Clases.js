class Persona {
    #alturaPrivada = 1.7;  //<--- atributo/campo privado
    static atributoEstatico = 1; //<--- atributo/campo de clase
    
    constructor (p_nombre, p_apellido){
        this.nombre = p_nombre||"Horacio"; //<-----atributo de instacia
        this.apellido = p_apellido||"Serrano";//<-----atributo de instacia
    }

    get altura(){ //getter
        return this.#alturaPrivada;
    }

    set altura(valor){//setter
        this.#alturaPrivada = valor;
    }

    imprimirNombre(){//metodo de instancia
        console.log("Nombre: " + this.nombre + " Apellido: " + this.apellido);   
    }

    #metodoPrivado(){//metodo de instancia privado
        console.log("metodo privado");
    }

    imprimirMetodoPrivado(){//metodo de instancia llamando a privado
        this.#metodoPrivado();//<---- ojo # para acceder a metodos/atributos privados   
    }

    static metodoEstatico(){//metodo estatico
        console.log("Metodo Estatico");
    }

}


class Ciudadano extends Persona{
    constructor (nom, ape, dni){
        super(nom, ape);
        this.dni = dni || 123456789; //<---iniciado por cortocircuito no hay parametros opcionales
    }

    toString(){ //<--redefino metodo
        return ("Nombre: " + this.nombre + " Apellido: " + this.apellido + " DNI: " + this.dni.toString());
    }

    imprimirNombre(){//<<---refdefino llamando al metodo del padre.
        console.log("metodo redefinido");
        super.imprimirNombre();
        console.log("metodo redefinido");
    }

}

let p0 = new Persona("Pepe");
p0.imprimirNombre();

let p1 = new Persona();
p1.imprimirNombre();
//p1.metodoPrivado();
p1.imprimirMetodoPrivado();
console.log("Altura: " + p1.altura.toString());
p1.altura = 2;
console.log("Altura: " + p1.altura.toString());
Persona.metodoEstatico();

console.log("Atributo Estatico: " + Persona.atributoEstatico.toString());
Persona.atributoEstatico=8;

console.log("Atributo Estatico: " + Persona.atributoEstatico.toString());

let c1 = new Ciudadano();
console.log(c1.toString());

console.log("P1 es persona: " + (p1 instanceof Persona).toString());
console.log("P1 es ciudadano: " + (p1 instanceof Ciudadano).toString());

console.log("C1 es persona: " + (c1 instanceof Persona).toString());
console.log("C1 es ciudadano: " + (c1 instanceof Ciudadano).toString());


c1.imprimirNombre();


let vector = [new Ciudadano(), new Ciudadano()];

vector.push(new Persona());

console.log(vector);



