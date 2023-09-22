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



/////////////////// FUNCION MOSTRAR IMG INCIAL ///////////////////

const mostrarImgSinOperaciones = (idDeVistaAOcultar, idDeVistaAMostrar) =>{
    if (operaciones.length > 0) {
        $(`#${idDeVistaAOcultar}`).classList.add("is-hidden");
        $(`#${idDeVistaAMostrar}`).style.display = "block";
    } else {
        $(`#${idDeVistaAOcultar}`).classList.remove("is-hidden");
        $(`#${idDeVistaAMostrar}`).style.display = "none";
    }
}

const mostrarReportesCuandoCorresponda = (vistaAOcultar, vistaAMostrar) => {
    if (totalGanancias > 0 && totalGastos > 0) {
        $(`#${vistaAOcultar}`).classList.add("is-hidden");
        $(`#${vistaAMostrar}`).style.display = "block";
    } else {
        $(`#${vistaAOcultar}`).classList.remove("is-hidden");
        $(`#${vistaAMostrar}`).style.display = "none";
    }
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

        const fechaFormateada = new Date(fecha + 'T00:00:00-03:00');

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
            <span class="is-size-6">${fechaFormateada.getDate()}/${fechaFormateada.getMonth() + 1}/${fechaFormateada.getFullYear()}</span>
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

    // Reemplaza la img inicial por la lista de operaciones
    mostrarImgSinOperaciones("img-operaciones", "items-operaciones")


    // Reemplaza la img inicial por el contenedor de reportes
    //mostrarImgSinOperaciones("sin-reportes", "con-reportes")
    mostrarReportesCuandoCorresponda("sin-reportes", "con-reportes");
};



//////////////////////// Funcion para ELIMINAR operacion ////////////////////////////////

const eliminarOperacion = (id) => {
    const confirmarEliminacion = confirm("¿Estás seguro de que deseas eliminar esta operación?");

    if (confirmarEliminacion) {
        operaciones = operaciones.filter((operacion) => operacion.id !== id);

        const totalGanancias = operacionesFiltradas(operaciones, "Ganancia");
        const totalGastos = operacionesFiltradas(operaciones, "Gasto");

        
        const totalBalance = totalGanancias - totalGastos;


        $("#monto-ganancias").innerHTML = `+$${totalGanancias}`;
        $("#monto-gastos").innerHTML = `-$${totalGastos}`;
        $("#total-balance").innerHTML = `$${totalBalance}`;

        // actualizar estilo del div balance
        const signoMonto = totalBalance > 0 ? `+` : totalBalance < 0 ? `-` : ``;
        $("#total-balance").classList.remove("has-text-success", "has-text-danger");

        if (signoMonto === "+") {
            $("#total-balance").classList.add("has-text-success");
        } else if (signoMonto === "-") {
            $("#total-balance").classList.add("has-text-danger");
        }

        actualizarReportes();
        listaOperaciones(operaciones);
        subirDatos({ operaciones });
    }
};


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

////////////////////////// Funcion para filtrar por tipo ////////////////////////////////


const filtrarPorTipo = (listaOperaciones, tipoOperacion) => {
    if (tipoOperacion === "Todos") {
        return listaOperaciones;
    } else {
        return listaOperaciones.filter((operacion) => operacion.tipo === tipoOperacion);
    }
};

$("#filtro-tipo").addEventListener("change", () => aplicarFiltros());

const filtrarPorCategoria = (listaOperaciones, tipoCategoria) => {
    if (tipoCategoria === "todas") {
        return listaOperaciones;
    } else {
        return listaOperaciones.filter((operacion) => operacion.categoria === tipoCategoria);
    }
};

$("#filtro-categoria").addEventListener("change", () => aplicarFiltros());

const ordernarPorFecha = (operaciones, orden) => {
    return [...operaciones].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return orden === "ASC"
        ? fechaA.getTime() - fechaB.getTime()
        : fechaB.getTime() - fechaA.getTime();
    });
};

$("#filtro-orden").addEventListener("change", () => aplicarFiltros());

const aplicarFiltros = () => {
    let operacionesFiltradas = [...operaciones];


    let filtroTipo = $("#filtro-tipo").value;
    let filtroCategoria = $("#filtro-categoria").value;
    let filtroOrden = $("#filtro-orden").value;


    operacionesFiltradas = filtrarPorTipo(operacionesFiltradas, filtroTipo);     
    operacionesFiltradas = filtrarPorCategoria(operacionesFiltradas, filtroCategoria);
    operacionesFiltradas = ordernarPorFecha(operacionesFiltradas, filtroOrden);

    listaOperaciones(operacionesFiltradas);
};

























































































//////////////////////////// REPORTES ////////////////////////////////


const categoriasConOperaciones = categorias.map(categoriaObj => {
const operacionPorCategoria = operaciones.filter(operacion => operacion.categoria === categoriaObj.id);

    let gasto = 0;
    let ganancia = 0;

    operacionPorCategoria.forEach(op => {
        if (op.tipo === "Ganancia") {
            ganancia += parseFloat(op.monto);
        } else if (op.tipo === "Gasto") {
            gasto += parseFloat(op.monto);
        }
    });

    return {
        nombre: categoriaObj.nombre,
        ganancia,
        gasto,
        balance: ganancia - gasto,
    };
});

const calcularResumen = (elemento) => {
    const ordenado = [...categoriasConOperaciones];
    ordenado.sort((a, b) => b[elemento] - a[elemento]);
    return ordenado[0];
};



const resumenGanancia = calcularResumen("ganancia");
const resumenGasto = calcularResumen("gasto");
const resumenBalance = calcularResumen("balance");



const calcularMesConMayorGanancia = () => {
    const mesGanancia = operaciones.reduce((acumulador, operacion) => {
        if (operacion.tipo === "Ganancia") {
            const fecha = new Date(operacion.fecha);
            const mes = fecha.getMonth() + 1;
            const monto = parseFloat(operacion.monto);

            if (!acumulador[mes]) {
                acumulador[mes] = 0;
            }

            acumulador[mes] += monto;
        }
        return acumulador;
    }, {});


    let mesMayorGanancia = null;
    let montoMayorGanancia = 0;

    for (const mes in mesGanancia) {
        if (mesGanancia[mes] > montoMayorGanancia) {
            mesMayorGanancia = mes;
            montoMayorGanancia = mesGanancia[mes];
        }
    }

    return {
        mes: mesMayorGanancia,
        monto: montoMayorGanancia,
    };
};

const calcularMesConMayorGasto = () => {
    const mesGasto = operaciones.reduce((acumulador, operacion) => {
        if (operacion.tipo === "Gasto") {
            const fecha = new Date(operacion.fecha);
            const mes = fecha.getMonth() + 1; 
            const monto = parseFloat(operacion.monto);

            if (!acumulador[mes]) {
                acumulador[mes] = 0;
            }

            acumulador[mes] += monto;
        }
        return acumulador;
    }, {});


    let mesMayorGasto = null;
    let montoMayorGasto = 0;

    for (const mes in mesGasto) {
        if (mesGasto[mes] > montoMayorGasto) {
            mesMayorGasto = mes;
            montoMayorGasto = mesGasto[mes];
        }
    }

    return {
        mes: mesMayorGasto,
        monto: montoMayorGasto,
    };
};

// Llamo a las funciones para calcular los resúmenes de mes
const resumenMesGanancia = calcularMesConMayorGanancia();
const resumenMesGasto = calcularMesConMayorGasto();



//////////////////////////////////totales por categoria////////////////////
const categoriasUnicas = [...new Set(operaciones.map((operacion) => operacion.categoria))];

const totales = {};


categoriasUnicas.forEach((categoria) => {
    totales[categoria] = {
        ganancias: 0,
        gastos: 0,
        balance: 0,
    };
});


operaciones.forEach((operacion) => {
    const { categoria, tipo, monto } = operacion;

    if (categoriasUnicas.includes(categoria)) {
        if (tipo === 'Ganancia') {
            totales[categoria].ganancias += monto;
        } else if (tipo === 'Gasto') {
            totales[categoria].gastos += monto;
        }

        // Calcula el balance
        totales[categoria].balance = totales[categoria].ganancias - totales[categoria].gastos;
    }
});


categoriasUnicas.forEach((categoriaId) => {
    const categoria = categorias.find((c) => c.id === categoriaId);

    if (categoria) {
        const total = totales[categoriaId];

        const filaHTML = `
            <div class="columns has-text-weight-medium pt-1 pb-1">
                <div class="column is-3 has-text-centered">${categoria.nombre}</div>
                <div class="column is-3 has-text-centered has-text-success">+${total.ganancias.toFixed(2)}</div>
                <div class="column is-3 has-text-centered has-text-danger">-${total.gastos.toFixed(2)}</div>
                <div class="column is-3 has-text-centered">${total.balance.toFixed(2)}</div>
            </div>
        `;

        $("#total-por-ganancia").innerHTML += filaHTML;
    }
});


const actualizarReportes = () => {

    const resumenGanancia = calcularResumen("ganancia");
    const resumenGasto = calcularResumen("gasto");
    const resumenBalance = calcularResumen("balance");

    const obtenerSigno = (tipo) => {
        return tipo === 'Gasto' ? '-' : '+';
    };

    $("#categoria-mayor-ganancia").textContent = resumenGanancia.nombre;
    $("#categoria-monto-mayor-ganancia").textContent = `${obtenerSigno("Ganancia")}$${resumenGanancia.ganancia}`;

    $("#categoria-mayor-gasto").textContent = resumenGasto.nombre;
    $("#categoria-monto-mayor-gasto").textContent = `${obtenerSigno("Gasto")}$${resumenGasto.gasto}`;

    $("#categoria-mayor-balance").textContent = resumenBalance.nombre;
    $("#categoria-monto-mayor-balance").textContent = `$${resumenBalance.balance}`;

    $("#mes-mayor-ganancia").textContent = resumenMesGanancia.mes ? `${resumenMesGanancia.mes}/2023` : "N/A";
    $("#mes-monto-mayor-ganancia").textContent = `${obtenerSigno("Ganancia")}$${resumenGanancia.ganancia}`;

    $("#mes-mayor-gasto").textContent = resumenMesGasto.mes ? `${resumenMesGasto.mes}/2023` : "N/A";
    $("#mes-monto-mayor-gasto").textContent = `${obtenerSigno("Gasto")}$${resumenGasto.gasto}`;
};

actualizarReportes();































































































/////////////////// FUNCION INICIALIZAR ///////////////////

const inicializar = () =>{
    llenarSelect(categorias);
    listaCategorias(categorias);
    subirDatos({ categorias });
    listaOperaciones(operaciones);
    actualizarReportes(operaciones);
}

window.onload = inicializar();




//[]