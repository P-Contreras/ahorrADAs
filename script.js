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


/////////////////// funcion random ID ///////////////////

const randomId = () => self.crypto.randomUUID();

/////////////////// funcion para agregar categorias ///////////////////

const traerCategorias = () => {
    return traerDatos()?.categorias;
};

let categorias = traerCategorias() || [
    {
    id: randomId(),
    nombre: "Comida",
    },
    {
    id: randomId(),
    nombre: "Servicios",
    },
    {
    id: randomId(),
    nombre: "Transporte",
    },
    {
    id: randomId(),
    nombre: "Educacion",
    },
    {
    id: randomId(),
    nombre: "Trabajo",
    },
];

/////////////////// funcion para agregar categorias en el select ///////////////////

const llenarSelect = (categorias) => {
    $$(".select-categorias").forEach((select) => {
    select.innerHTML = "";

    if (select.classList.contains("todos-filtros")) {
        select.innerHTML = "<option value='todas'>Todas</option>";
    }

    for (let { nombre, id } of categorias) {
        select.innerHTML += `<option value="${id}">${nombre}</option>`;
    }
    });
};


const listaCategorias = (categorias) => {
    console.log(categorias);
    $("#items-categorias").innerHTML = "";
    for (let { nombre, id } of categorias) {
        $("#items-categorias").innerHTML += 
        `<li class="mb-3 columns is-vcentered">
            <div class="column">
                <span class="tag is-info is-light is-size-6">${nombre}</span>
            </div>
            <div class="column has-text is-narrow">
                <a onclick="showEditCategory('${id}')" id="${id}" class="mr-4 edit-link is-size-6">Editar</a>
                <a onclick="showEditCategory('${id}')" id="${id}" class="mr-4 edit-link is-size-6">Eliminar</a>
            </div>
        </li>`;
        }
    };


llenarSelect(categorias);
listaCategorias(categorias);