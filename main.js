/*
    Cargar comidas en memoria desde el JSON
*/
let comidas = [];
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidasConForEach()
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });
const comidasContainer = document.getElementById("comidaContainer");
function mostrarComidasConForEach() {
  comidasContainer.innerHTML = "";

  comidas.forEach(comida => {
    comidasContainer.innerHTML += `
      <article class="card">
        <h2>${comida.nombre}</h2>
        <p>${comida.provincia}</p>
        <span class="categoria">${comida.categoria}</span>
        <ul>
          ${comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join("")}
        </ul>
      </article>
    `;
  });
}
const agregarComidaForm = document.getElementById("agregarComidaForm");

agregarComidaForm.addEventListener ("submit", (event) => {

  event.preventDefault()
 // alert("comida agregada: " + event.target.nombre.value);
 let nuevaComida = {
  nombre: event.target.nombre.value,
  provincia: event.target.provincia.value,
  categoria: event.target.categoria.value,
  ingredientes: event.target.ingredientes.value.split(",")
 }

 comidas.push(nuevaComida)
 mostrarComidasConForEach(comidas)
event.target.reset()
})

const filtroCategoria = document.getElementById("filtroCategoria")

filtroCategoria.addEventListener("change", () =>{

  let comidasFiltradas = comidas.filter( comida => {
    return comida.categoria.includes(filtroCategoria.value)
  })

  mostrarComidas(comidasFiltradas)
})