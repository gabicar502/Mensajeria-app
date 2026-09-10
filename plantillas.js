const STORAGE_KEY = "mensajeriaAppPlantillasMeta";

const ejemplos = [
  {
    nombre: "pedido_para_recoger",
    categoria: "UTILITY",
    idioma: "es_CO",
    estado: "Aprobada",
    encabezado: "Pedido para recoger #{{1}}",
    cuerpo: "Hola {{1}}, tu pedido #{{2}} fue recibido.\n\nDetalle:\n{{3}}\n\nTotal a pagar: {{4}}\nSede de recogida: {{5}}",
    pie: "Mensajeria-app",
    botonUno: "Ver mapa",
    botonDos: "Hablar con asesor"
  },
  {
    nombre: "recordatorio_cita",
    categoria: "UTILITY",
    idioma: "es_CO",
    estado: "En revisión",
    encabezado: "Recordatorio de cita",
    cuerpo: "Hola {{1}}, te recordamos tu cita para el {{2}} a las {{3}}. Responde este mensaje si necesitas cambiarla.",
    pie: "Mensajeria-app",
    botonUno: "Confirmar",
    botonDos: "Reprogramar"
  },
  {
    nombre: "promocion_mes",
    categoria: "MARKETING",
    idioma: "es_CO",
    estado: "Borrador",
    encabezado: "Oferta para {{1}}",
    cuerpo: "Hola {{1}}, este mes tenemos una promoción especial en {{2}}. Escríbenos para conocer disponibilidad.",
    pie: "Puedes pedir dejar de recibir mensajes.",
    botonUno: "Ver oferta",
    botonDos: "No recibir más"
  }
];

const form = document.querySelector("#formPlantilla");
const campos = {
  nombre: document.querySelector("#nombrePlantilla"),
  categoria: document.querySelector("#categoriaPlantilla"),
  idioma: document.querySelector("#idiomaPlantilla"),
  estado: document.querySelector("#estadoPlantilla"),
  encabezado: document.querySelector("#encabezadoPlantilla"),
  cuerpo: document.querySelector("#cuerpoPlantilla"),
  pie: document.querySelector("#piePlantilla"),
  botonUno: document.querySelector("#botonUnoPlantilla"),
  botonDos: document.querySelector("#botonDosPlantilla")
};

const tabla = document.querySelector("#tablaPlantillas");
const variablesDetectadas = document.querySelector("#variablesDetectadas");
const previewCategoria = document.querySelector("#previewCategoria");
const previewEncabezado = document.querySelector("#previewEncabezado");
const previewCuerpo = document.querySelector("#previewCuerpo");
const previewPie = document.querySelector("#previewPie");
const previewBotones = document.querySelector("#previewBotones");

const metricTotal = document.querySelector("#metricTotal");
const metricAprobadas = document.querySelector("#metricAprobadas");
const metricRevision = document.querySelector("#metricRevision");

function cargarPlantillas() {
  const guardadas = localStorage.getItem(STORAGE_KEY);
  if (!guardadas) return ejemplos;

  try {
    return JSON.parse(guardadas);
  } catch {
    return ejemplos;
  }
}

function guardarPlantillas(plantillas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plantillas));
}

let plantillas = cargarPlantillas();

function plantillaDesdeForm() {
  return Object.fromEntries(
    Object.entries(campos).map(([key, input]) => [key, input.value.trim()])
  );
}

function ponerForm(plantilla) {
  Object.entries(campos).forEach(([key, input]) => {
    input.value = plantilla[key] ?? "";
  });
  actualizarPreview();
}

function extraerVariables(plantilla) {
  const texto = `${plantilla.encabezado} ${plantilla.cuerpo} ${plantilla.pie}`;
  return [...new Set(texto.match(/\{\{\d+\}\}/g) ?? [])].sort((a, b) => {
    return Number(a.replace(/\D/g, "")) - Number(b.replace(/\D/g, ""));
  });
}

function reemplazarVariables(texto) {
  const muestras = {
    "{{1}}": "Sergio",
    "{{2}}": "6720",
    "{{3}}": "Hamburguesa x1 - $30.000\nEmparedado x1 - $20.000",
    "{{4}}": "$50.000",
    "{{5}}": "Sede Sin Domicilio"
  };

  return texto.replace(/\{\{\d+\}\}/g, (variable) => muestras[variable] ?? variable);
}

function estadoClase(estado) {
  if (estado === "Aprobada") return "e-leido";
  if (estado === "En revisión") return "e-entregado";
  if (estado === "Rechazada") return "e-fallido";
  return "e-enviado";
}

function actualizarPreview() {
  const plantilla = plantillaDesdeForm();
  const variables = extraerVariables(plantilla);
  variablesDetectadas.textContent = variables.length ? variables.join(" ") : "Sin variables";

  previewCategoria.textContent = plantilla.categoria || "UTILITY";
  previewEncabezado.textContent = reemplazarVariables(plantilla.encabezado || "Sin encabezado");
  previewCuerpo.textContent = reemplazarVariables(plantilla.cuerpo || "Escribe el cuerpo de la plantilla.");
  previewPie.textContent = plantilla.pie || "Sin pie";

  previewBotones.innerHTML = "";
  [plantilla.botonUno, plantilla.botonDos].filter(Boolean).forEach((boton) => {
    const elemento = document.createElement("span");
    elemento.textContent = boton;
    previewBotones.append(elemento);
  });
}

function renderTabla() {
  tabla.innerHTML = "";

  plantillas.forEach((plantilla, index) => {
    const variables = extraerVariables(plantilla);
    const fila = document.createElement("tr");

    const nombre = document.createElement("td");
    const nombreTexto = document.createElement("strong");
    nombreTexto.textContent = plantilla.nombre;
    nombre.append(nombreTexto);

    const categoria = document.createElement("td");
    categoria.textContent = plantilla.categoria;

    const idioma = document.createElement("td");
    idioma.textContent = plantilla.idioma;

    const variablesCelda = document.createElement("td");
    variablesCelda.className = "mono";
    variablesCelda.textContent = variables.length ? variables.join(" ") : "-";

    const estado = document.createElement("td");
    const estadoEtiqueta = document.createElement("span");
    estadoEtiqueta.className = `estado ${estadoClase(plantilla.estado)}`;
    estadoEtiqueta.textContent = plantilla.estado;
    estado.append(estadoEtiqueta);

    const accion = document.createElement("td");
    const boton = document.createElement("button");
    boton.className = "accion-tabla";
    boton.type = "button";
    boton.dataset.index = String(index);
    boton.textContent = "Editar";
    accion.append(boton);

    fila.append(nombre, categoria, idioma, variablesCelda, estado, accion);
    tabla.append(fila);
  });

  metricTotal.textContent = plantillas.length;
  metricAprobadas.textContent = plantillas.filter((plantilla) => plantilla.estado === "Aprobada").length;
  metricRevision.textContent = plantillas.filter((plantilla) => plantilla.estado === "En revisión").length;
}

form.addEventListener("input", actualizarPreview);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nueva = plantillaDesdeForm();
  const existente = plantillas.findIndex((plantilla) => plantilla.nombre === nueva.nombre);

  if (existente >= 0) {
    plantillas[existente] = nueva;
  } else {
    plantillas = [nueva, ...plantillas];
  }

  guardarPlantillas(plantillas);
  renderTabla();
});

tabla.addEventListener("click", (event) => {
  const boton = event.target.closest("button[data-index]");
  if (!boton) return;
  ponerForm(plantillas[Number(boton.dataset.index)]);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#btnLimpiar").addEventListener("click", () => {
  ponerForm({
    nombre: "",
    categoria: "UTILITY",
    idioma: "es_CO",
    estado: "Borrador",
    encabezado: "",
    cuerpo: "",
    pie: "",
    botonUno: "",
    botonDos: ""
  });
});

document.querySelector("#btnEjemplos").addEventListener("click", () => {
  plantillas = ejemplos;
  guardarPlantillas(plantillas);
  ponerForm(ejemplos[0]);
  renderTabla();
});

ponerForm(ejemplos[0]);
renderTabla();
