// función reutilizable para traer elementos del HTML
function $(selector) {
    return document.querySelector(selector);
}

const botonCategoriasNavbar = $('#btn-nav-categorias');
const seccionCategorias = $('#seccion-categorias');
const seccionEditarCategorias = $('#seccion-editar-categorias');
const seccionBalance = $('#seccion-balance');
const seccionNuevaOperacion = $('#seccion-nueva-operacion');
const seccionReportesVacia = $('#seccion-reportes-vacia')
const botonBalanceNavbar = $('#btn-nav-balance');
const botonReportesNavbar = $('#btn-nav-reportes');


// botón Balance Navbar
botonBalanceNavbar.onclick = () => {
    seccionBalance.classList.remove("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionReportesVacia.classList.add("is-hidden");
}

// botón Categorias Navbar
botonCategoriasNavbar.onclick = () => {
    seccionCategorias.classList.remove("is-hidden");
    seccionEditarCategorias.classList.add("is-hidden");
    seccionBalance.classList.add("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");
    seccionReportesVacia.classList.add("is-hidden");
}

// botón Reportes Navbar
botonReportesNavbar.onclick = () => {
    seccionReportesVacia.classList.remove("is-hidden");
    seccionBalance.classList.add("is-hidden");
    seccionCategorias.classList.add("is-hidden")
    seccionEditarCategorias.classList.add("is-hidden");
}

// botón Ocultar Filtros
const btnOcultarFiltros = $('#ocultar-filtros');
const contenedorFiltros = $('#contenedor-filtros');

btnOcultarFiltros.onclick = () => {
    contenedorFiltros.classList.toggle("is-hidden");
    btnOcultarFiltros.textContent = contenedorFiltros.classList.contains("is-hidden") ? "Mostrar filtros" : "Ocultar filtros";
};