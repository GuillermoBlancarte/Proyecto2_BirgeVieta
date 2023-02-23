class BirgeVieta{
    //Creando el constructor de la clase
    //a0+a1x + a2^2 + a3 x^3
    constructor(a0,a1,a2,a3){
        this.a0 = a0;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;

        if(this.a3 != 1){
            let aux = this.a3
            this.a3 /= aux;
            this.a2 /= aux;
            this.a1 /= aux;
            this.a0 /= aux;
        }
        
        // a b c d 
        /*   + + + +
           = = = =
           + + +
           = = = */
        this.a = [[this.a3,this.a2,this.a1,this.a0],[0,0,0,0], [0,0,0,0], [0,0,0], [0,0,0]];
    }
    
    solucion(){
        let solucion =  -this.a0/ this.a1;
        
        let x = true;
        i = 0;
        do{

            //Haciendo la parte 1
            this.a[2][0] = this.a3;

            this.a[1][1] = solucion * this.a[2][0];

            this.a[2][1] = this.a[1][1] + this.a[0][1];

            this.a[1][2] = this.a[2][1] * solucion;

            this.a[2][2] = this.a[1][2] + this.a[0][2];

            this.a[1][3] = this.a[2][2] * solucion;

            this.a[2][3] = this.a[1][3] + this.a[0][3]

            
            //Haciendo la parte 2
            
            this.a[4][0] = this.a[2][0];
            
            this.a[3][1] = this.a[4][0] * solucion;
            
            this.a[4][1] = this.a[3][1] + this.a[2][1];
            
            this.a[3][2] = this.a[4][1] * solucion;
            
            this.a[4][2] = this.a[3][2] + this.a[2][2];
            
            solucion = solucion - (this.a[2][3] / this.a[4][2])
            
            console.log(solucion)
            
            if(this.a[2][3] == 0){
                console.log(solucion)
                if( (this.a[2][1]*this.a[2][1] - 4* this.a[2][0] * this.a[2][2]) >= 0){
                    let b = [[this.a[2][0],this.a[2][1],this.a[2][2]],[0,0,0],[0,0,0],[0,0],[0,0]];
                    let sol = this.solucion2(b);
                    sol.unshift(solucion);
                    return sol;
                }

                return [solucion]
               
           }

           i++;

           if(i == 10000000){
            return [solucion]
           }
        }while(x)
    }

    solucion2(b){
        let solucion =  -b[0][2]/ b[0][1];
        
        let x = true;
        do{
    
            //Haciendo la parte 1
            b[2][0] = b[0][0];
    
            b[1][1] = solucion * b[2][0];
    
            b[2][1] = b[1][1] + b[0][1];
    
            b[1][2] = b[2][1] * solucion;
    
            b[2][2] = b[1][2] + b[0][2];
    
            
            //Haciendo la parte 2
            
            b[4][0] = b[2][0];
            
            b[3][1] = b[4][0] * solucion;
            
            b[4][1] = b[3][1] + b[2][1];
            
            
            solucion = solucion - (b[2][2] / b[4][1])
            
            
            if(b[2][2] == 0){
                console.log(solucion)
                console.log(b)
                x = false
                return [solucion,-b[2][1]]
               
           }
        }while(x)
    }

    imprimirMatriz(){
        console.log(this.a);
    }
    
}

let btn = document.getElementById('boton');

btn.onclick = () => {
    i = false
    //Eliminando
    let b = document.getElementById('tabla-soluciones');
    let a = document.getElementById('sol');
    console.log(b)
    if(b){
        a.removeChild(b);
    }
    

    
    x3=  parseInt(document.getElementById('x3').value)
    x2=  parseInt(document.getElementById('x2').value)
    x= parseInt(document.getElementById('x').value)
    c= parseInt(document.getElementById('c').value)
    
    if(isNaN(x3) || isNaN(x2) || isNaN(x) || isNaN(c)){
        alert("Error uno de los campos ingresados no es un número")
        return;
    }

    if(x == 0){
        alert("Lo sentimos, no tenemos solución para este problema")
        return;
    }

    ec = new BirgeVieta(c,x,x2,x3);
    ec.imprimirMatriz();


    let solucion = ec.solucion();

    
    let bloque = document.createDocumentFragment();

    //Creando la estructura de la tabla
    let tabla = document.createElement('table');
    tabla.id = "tabla-soluciones"
    tabla.classList = "table table-striped table-primary table-hover"
    let thead = document.createElement('thead');
    let th1 = document.createElement('th');
    th1.innerHTML = "Solucion";
    let th2 = document.createElement('th');
    th2.innerHTML = "Valor";

    thead.appendChild(th1);
    thead.appendChild(th2);
    tabla.appendChild(thead);

    let tbody = document.createElement('tbody');

    i=1;
    solucion.forEach(sol => {
        let row = document.createElement('tr')
        let c1 = document.createElement('td');
        c1.innerHTML= i;
        
        let c2 = document.createElement('td');
        c2.innerHTML= sol;

        row.appendChild(c1);
        row.appendChild(c2);

        tbody.appendChild(row)

        i++
    });

    tabla.appendChild(tbody);
    //document.write(tabla)
    console.log(tabla)

    bloque.appendChild(tabla)

    document.getElementById("sol").appendChild(bloque)
    
}

