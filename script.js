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
                <a onclick="eliminarCategoria('${id}')" id="${id}" class="mr-4 edit-link is-size-6">Eliminar</a>
            </div>
        </li>`;
        }
    };


llenarSelect(categorias);
listaCategorias(categorias);

////////////////////////Función para obtener categoria/////////////////////////////////////////////

const obtenerCategoria = (idCategoria, categorias) => {
    return categorias.find((categoria) => categoria.id === idCategoria);
};

////////////////////////// EDITAR categoria //////////////////////////

const showEditCategory = (id) => {
    const categoriaAEditar = obtenerCategoria(id, categorias);
    if (!categoriaAEditar) {
        console.error("La categoría no se encontró.");
        return;
    }

    // Rellena el formulario de edición con el nombre de la categoría
    $("#input-editar-categoria").value = categoriaAEditar.nombre;
    $("#btn-guardar-categoria").dataset.id = id; // Almacenamos el ID en el botón Guardar
    $("#seccion-categorias").classList.add("is-hidden"); // Oculta la sección de categorías
    $("#seccion-editar-categorias").classList.remove("is-hidden"); // Muestra la sección de editar categorías
};

// Función para guardar la edición
const editarCategoria = () => {
    const id = $("#btn-guardar-categoria").dataset.id;
    const nuevoNombre = $("#input-editar-categoria").value;

    // Encuentra la categoría en el array
    const categoriaAEditar = categorias.find((categoria) => categoria.id === id);
    if (!categoriaAEditar) {
        console.error("La categoría no se encontró.");
        return;
    }

    categoriaAEditar.nombre = nuevoNombre;
    subirDatos({ categorias });
    listaCategorias(categorias);
    llenarSelect(categorias);

    // Oculta el formulario de edición y muestra la sección de categorías de nuevo
    $("#seccion-categorias").classList.remove("is-hidden");
    $("#seccion-editar-categorias").classList.add("is-hidden");
};

// Agregar un manejador de eventos al botón Guardar
$("#btn-guardar-categoria").addEventListener("click", editarCategoria);

// Función para el botón Agregar
const showAgregarCategoria = () => {
    $("#seccion-editar-categorias").classList.add("is-hidden");
    // // Muestra la sección de categorías
    $("#seccion-categorias").classList.remove("is-hidden");
};

// Agregar un manejador de eventos al botón Agregar
$("#btn-agregar-categoria").addEventListener("click", showAgregarCategoria);

//////////////////funcion de cancelar edicion de categoria////////////////////
const cancelarEdicionCategoria = () => {
    // Oculta la sección de edición de categorías
    $("#seccion-editar-categorias").classList.add("is-hidden");

    // Muestra la sección de categorías
    $("#seccion-categorias").classList.remove("is-hidden");
};

$("#btn-cancelar-edicion").addEventListener("click", cancelarEdicionCategoria);

/////////////////////////// Función para ELIMINAR una categoría ////////////////////////

const eliminarCategoria = (id) => {
    // pide al usuario confirmar que se quiere eliminar
    const confirmarEliminacion = confirm("¿Estás seguro de que deseas eliminar esta categoría?");

    if (confirmarEliminacion) {
        // Filtra las categorías para eliminar la categoría con el ID correspondiente
        categorias = categorias.filter((categoria) => categoria.id !== id);

        subirDatos({ categorias });
        listaCategorias(categorias);
        llenarSelect(categorias);
    }
};