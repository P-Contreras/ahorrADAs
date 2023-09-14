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
    const datosActualizados = traerDatos() || {};
    localStorage.setItem("datos", JSON.stringify({ ...datosActualizados, ...datos }));
    localStorage.setItem("categorias", JSON.stringify(categorias));
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

/////////////////// funcion para mostrar las categorias en el HTML ///////////////////
const listaCategorias = (categorias) => {
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
subirDatos({ categorias });


////////////////////////// Función para obtener categoria //////////////////////////

const obtenerCategoria = (idCategoria, categorias) => {
    return categorias.find((categoria) => categoria.id === idCategoria);
};

////////////////////////// Función para AGREGAR categoria //////////////////////////
const botonAgregarCategoria = $("#btn-agregar-categoria");
const inputNuevaCategoria = $("#nueva-categoria-input");


botonAgregarCategoria.addEventListener("click", () => {
    const nuevoNombreCategoria = inputNuevaCategoria.value;

    const nuevaCategoria = {
        id: randomId(),
        nombre: nuevoNombreCategoria,
    };

    // Agrega la nueva categoría al array de categorías
    categorias.push(nuevaCategoria);

    // Actualiza el almacenamiento local (si es necesario)
    subirDatos({ categorias });

    // Actualiza la lista de categorías en el HTML
    listaCategorias(categorias);

    //actualizo los select con la nueva categoria agregada
    llenarSelect(categorias);

    inputNuevaCategoria.value = "";
});

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
    $("#seccion-categorias").classList.add("is-hidden");
    $("#seccion-editar-categorias").classList.remove("is-hidden");
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

    $("#seccion-categorias").classList.remove("is-hidden");
    $("#seccion-editar-categorias").classList.add("is-hidden");
};

// eventlistener para el botón GUARDAR
$("#btn-guardar-categoria").addEventListener("click", editarCategoria);

// Función para el botón Agregar
const showAgregarCategoria = () => {
    $("#seccion-editar-categorias").classList.add("is-hidden");
    $("#seccion-categorias").classList.remove("is-hidden");
};

// eventlistener para el botón AGREGAR
$("#btn-agregar-categoria").addEventListener("click", showAgregarCategoria);


//////////////////funcion de CANCELAR edicion de categoria////////////////////
const cancelarEdicionCategoria = () => {
    showVista("seccion-categorias");
}

$("#btn-cancelar-edicion").addEventListener("click", cancelarEdicionCategoria);

/////////////////////////// Función para ELIMINAR una categoría ////////////////////////

const eliminarCategoria = (id) => {
    // pide al usuario confirmar que se quiere eliminar
    const confirmarEliminacion = confirm("¿Estás seguro de que deseas eliminar esta categoría?");

    if (confirmarEliminacion) {
        categorias = categorias.filter((categoria) => categoria.id !== id);

        subirDatos({ categorias });
        listaCategorias(categorias);
        llenarSelect(categorias);
    }

};


//////////////////////// funcion CANCELAR OPERACION ////////////////////////////////
const cancelarNuevaOp = () => {
    showVista("seccion-balance"); 
}
$("#btn-cancelar-op").addEventListener("click", cancelarNuevaOp);



//////////////////////// Funcion NUEVA OPERACION ////////////////////////////////

const traerOperaciones = () => {
    return traerDatos()?.operaciones || [];
};

let operaciones = traerOperaciones()

const nuevaOperacion = () =>{
        let operacion = {
            id: randomId(),
            descripcion: $('#input-descripcion').value,
            monto: Number($('#input-monto').value),
            tipo: $('#select-tipo').value,
            categoria: $('#select-categorias').value,
            fecha: $('#input-fecha').value,
        }

        operaciones.push(operacion);

        subirDatos({ operaciones: [...traerOperaciones(), operacion] });

        showVista("seccion-balance");
    };

$("#btn-agregar-op").addEventListener("click", nuevaOperacion)


//////////////////////// Funcion para que la lista de operaciones se vea en el html ////////////////////////////////

const listaOperaciones = (operaciones) => {
    //Encabezado de la tabla
    $("#items-operaciones").innerHTML = 
    `<li class="columns is-vcentered">
        <div class="column is-3">
            <span class="is-size-6 has-text-weight-bold">Descripción</span>
        </div>
        <div class="column">
            <span class="is-size-6 has-text-weight-bold">Categoría</span>
        </div>
        <div class="column">
            <span class="is-size-6 has-text-weight-bold">Fecha</span>
        </div>
        <div class="column">
            <span class="is-size-6 has-text-weight-bold">Monto</span>
        </div>
        <div class="column">
            <span class="is-size-6 has-text-weight-bold">Acciones</span>
        </div>
    </li>`;

    // Operaciones
    for (let { id, descripcion, categoria, fecha, monto, tipo } of operaciones) {
        const categoriaArr = obtenerCategoria(categoria, categorias);
        const categoriaNombre = categoriaArr ? categoriaArr.nombre : 'Categoría no encontrada';

        const fechaFormateada = new Date(fecha);

        const montoSigno = tipo === "Ganancia" ? `+$` : `-$`;
        const montoClase = tipo === "Ganancia" ? "has-text-success" : "has-text-danger";

        $("#items-operaciones").innerHTML += 
        `<li class="columns is-vcentered">
            <div class="column is-3">
                <span class="is-size-6 has-text-weight-bold">${descripcion}</span>
            </div>
            <div class="column">
                <span class="tag is-info is-light is-size-7">${categoriaNombre}</span>
            </div>
            <div class="column">
            <span class="is-size-6">${fechaFormateada.getDate() + 1}/${fechaFormateada.getMonth() + 1}/${fechaFormateada.getFullYear()}</span>
            </div>
            <div class="column">
                <span class="is-size-6 has-text-weight-bold ${montoClase} has-text-right">${montoSigno}${monto}</span>
            </div>
            <div class="column">
                <a onclick="showEditOperation('${id}')" id="${id}" class="mr-4 edit-link is-size-7">Editar</a>
                <a onclick="eliminarOperacion('${id}')" id="${id}" class="mr-4 edit-link is-size-7">Eliminar</a>
            </div>
        </li>`
    }

    // $("#img-operaciones").classList.add("is-hidden");
};

listaOperaciones(operaciones)



//////////////////////// Funcion para ELIMINAR operacion ////////////////////////////////

const eliminarOperacion = (id) =>{
    // pide al usuario confirmar que se quiere eliminar
    const confirmarEliminacion = confirm("¿Estás seguro de que deseas eliminar esta operación?");

    if (confirmarEliminacion) {
        operaciones = operaciones.filter((operacion) => operacion.id !== id);

        subirDatos({ operaciones });
        listaOperaciones(operaciones)
    }
}


//////////////////////// Funcion para EDITAR operacion ////////////////////////////////

const obtenerOperacion = (idOperacion) => {
    return operaciones.find((operacion) => operacion.id === idOperacion);
};


const showEditOperation = (id) =>{

    //Abre la seccion editar operacion
    showVista("seccion-editar-operacion")

    let = {descripcion, monto, tipo, categoria, fecha} = obtenerOperacion(id)

    // Rellena el form con la info de la operacion seleccionada
    $('#editar-operacion-descripcion').value = descripcion;
    $('#editar-operacion-monto').value = monto;
    $('#editar-operacion-tipo').value = tipo;
    $('#editar-operacion-categoria').value = categoria;
    $('#editar-operacion-fecha').value = fecha

    // Funcionalidad del boton cancelar
    $("#btn-cancelar-editar-op").addEventListener("click", () =>
    showVista("seccion-balance")
    );

    // Funcionalidad del boton editar
    $("#btn-editar-op").addEventListener("click", () => editarOperacion(id));
}


// //////////////////////// Funcion para guardar la edicion ////////////////////////////////

const editarOperacion = (id) => {
    const operacionAEditar = obtenerOperacion(id);

    if (!operacionAEditar) {
        console.error("La operación no se encontró.");
        return;
    }

    operacionAEditar.descripcion = $('#editar-operacion-descripcion').value;
    operacionAEditar.monto = parseFloat($('#editar-operacion-monto').value); 
    operacionAEditar.tipo = $('#editar-operacion-tipo').value;
    operacionAEditar.categoria = $('#editar-operacion-categoria').value;
    operacionAEditar.fecha = $('#editar-operacion-fecha').value;

    subirDatos({ operaciones });
    listaOperaciones(operaciones);
    showVista("seccion-balance");
};


// //////////////////////// Funcion para filtrar y sumar segun el tipo de la operacion ////////////////////////////////


const operacionesFiltradas = (operaciones, tipo) => {
    const filtroPorTipo = operaciones.filter((operacion) => operacion.tipo === tipo);
    const montoTotal = filtroPorTipo.reduce((total, operacion) => total + operacion.monto, 0);
    return montoTotal;
};

const totalGanancias = operacionesFiltradas(operaciones, "Ganancia");
const totalGastos = operacionesFiltradas(operaciones, "Gasto");

const totalBalance = totalGanancias - totalGastos;


// //////////////////////// Funcion para que todo se vea en el html ////////////////////////////////


const signoMonto = totalBalance > 0 ? `+` : totalBalance < 0 ? `-` : ``;

const colorMonto = signoMonto !== "" ? $("#total-balance").classList.add(signoMonto === "+" ? "has-text-success" : "has-text-danger") : "";


$("#monto-ganancias").innerHTML = `+$${totalGanancias}`
$("#monto-gastos").innerHTML = `-$${totalGastos}`
$("#total-balance").innerHTML = `${signoMonto}$${Math.abs(totalBalance)}`




//[]