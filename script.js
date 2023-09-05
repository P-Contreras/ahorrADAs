// funciones reutilizables para traer elementos del HTML

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/////////////////// FUNCION MOSTRAR VISTAS ///////////////////
const showVista = (vistaAMostrar) => {
    $$(".vista").forEach((vista) => vista.classList.add("is-hidden"));
    $(`#${vistaAMostrar}`).classList.remove("is-hidden");
};

$("#btn-nav-balance").addEventListener("click", () =>
    showVista("seccion-balance")
);

$("#btn-nav-reportes").addEventListener("click", () =>
    showVista("seccion-reportes-vacia")
);

$("#btn-nav-categorias").addEventListener("click", () =>
    showVista("seccion-categorias")
);

$("#btn-nueva-operacion").addEventListener("click", () =>
    showVista("seccion-nueva-operacion")
);


// botón Ocultar Filtros
const btnOcultarFiltros = $('#ocultar-filtros');
const contenedorFiltros = $('#contenedor-filtros');

btnOcultarFiltros.onclick = () => {
    contenedorFiltros.classList.toggle("is-hidden");
    btnOcultarFiltros.textContent = contenedorFiltros.classList.contains("is-hidden") ? "Mostrar filtros" : "Ocultar filtros";
};


/////////////////// FUNCION LOCAL STORAGE ///////////////////

const traerDatos = () => {
    return JSON.parse(localStorage.getItem("datos"));
};


const subirDatos = (datos) => {
    localStorage.setItem("datos", JSON.stringify({ ...traerDatos(), ...datos }));
};
