const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = []
 
cargarEventListeners();
 
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos de carrito
    carrito.addEventListener('click',eliminaCurso)

    //vaciar carro
    vaciarCarritoBtn.addEventListener('click', ()=>{

        articulosCarrito=[]; //reseteamos objeto

        limpiarHTML()  //limpiamos html
    })
}
 
// Funciones
function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        leerDatoCurso(e.target.parentElement.parentElement);
    }
}

//eliminar curso
function eliminaCurso(e) {
    console.log(e.target)
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId= e.target.getAttribute('data-id')
        
        articulosCarrito=articulosCarrito.filter(curso => curso.id !== cursoId )
        carroHTML();
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

    //revisar cantidad de elementos
    const existe = articulosCarrito.some( curso => curso.id === infoCuros.id )
    if(existe){
        //actualizar cantidad
        const cursos= articulosCarrito.map(curso =>{
            if (curso.id === infoCuros.id) {
                curso.cantidad++;
                return curso;  //retorna obj actualizado
            }
            else{
                return curso; //retorna obj no son duplicado
            }
        })
        articulosCarrito=[...cursos]
        
    }else{
       //agregar compra a carrito
        articulosCarrito = [...articulosCarrito,infoCuros]
        carroHTML()
    }
}

//muestra articulos en el carro 

function carroHTML() {

    //limpiar html
    limpiarHTML()

    //genera html
    articulosCarrito.forEach(cursos => {
        const{imagen,titulo,precio,cantidad,id}=cursos
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}"  >
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> x </a>
            </td>
        `;
        //agrega html en el carro 
        contenedorCarrito.appendChild(row)
    });
}

function limpiarHTML() {
    // contenedorCarrito.innerHTML=[]   --- forma lenta

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}