const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = []
 
cargarEventListeners();
 
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
}
 
// Funciones
function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        leerDatoCurso(e.target.parentElement.parentElement);
    }
}

//extrar dato de curso seleccionado
function leerDatoCurso(curso) {
    


    const infoCuros = {
        imagen : curso.querySelector('img').src ,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        
    }
    //agregar compra a carrito
    articulosCarrito = [...articulosCarrito,infoCuros]
    console.log(articulosCarrito)
}