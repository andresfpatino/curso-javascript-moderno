/* Variables */
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

/* EventListeners */
function cargarEventListeners(){
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el carrito
        limpiarHTML(); // eliminamos todo el HTML.
    });
}

/* Funciones */
function agregarCurso(e){
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

/* Eliminar un curso del carrito */
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
       const cursoId = e.target.getAttribute('data-id');

      /* Eliminar del arreglo de articulosCarrito por el data-id */
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );
        // console.log(articulosCarrito);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML

    }
}

/* Leer el contenido del HTML al que le dimos click  y extrae la info del curso */
function leerDatosCurso(curso){
    //console.log(curso);

    /* Crear un objeto con el contenido del curso actual */
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        imagen: curso.querySelector('img').src,
        cantidad: 1
    }
    //console.log(infoCurso)


    /* Revisa si un elemento ya existe en el carrito */
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe){
        /* actualizamos la cantidad */
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                 curso.cantidad++;
                 return curso; // retorna el obj actualizado
            }else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        /* Agregar elementos al arreglo del carrito */
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}


/* Muestra el carrito de compras en el HTML */
function carritoHTML(){

    /* Limpiar el HTML */
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        //console.log(curso)
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img width="100" src="${imagen}" alt="${titulo}">  </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        /* Agrega el HTML del carrito en el tbody */
        contenedorCarrito.appendChild(row);
    });
}

/* Elimina los cursos del tbody para que no se repitan */
function limpiarHTML(){
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}