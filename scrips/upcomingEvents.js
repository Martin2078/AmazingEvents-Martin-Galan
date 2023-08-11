const mainDiv = document.getElementById("card-conteiner")
const moment = data.currentDate

function crearTarjeta(event)
{
    return `<div id="${event._id}" class="card" style="width: 15rem;">
    <img src="${event.image}" class="card-img-top" alt="...">
    <section class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text info">${event.description}</p>
      <div class="price-details">
        <h4>USD $${event.price}</h4>
        <a href="./details.html?identifyer=${event._id}" class="btn btn-primary">Details</a>
      </div> 
    </section>
</div>`
}

function filtrar(events,date) {
  const evento=[]
  for (const event of events) {
    if (date<event.date) {
      evento.push(event)
    }  
  }
  return evento
}
const upcoming=filtrar(data.events,moment)

function mostrarUpcomingEvents(events){
  let aux=""
  mainDiv.innerHTML=""
    for (const event of events) {
      aux += crearTarjeta(event)
    }
    return aux
}

const upcomingEvents= mostrarUpcomingEvents(upcoming)
mainDiv.innerHTML+=upcomingEvents






const categoriesConteiner=document.getElementById(`categories-div`)

//creo un set(sin repetir) de categories y añado las que no se repitan
const uniques= new Set();
function uniquesCategory(events) {
  for (const event of events) {
    uniques.add(`${event.category}`)
  }
}
uniquesCategory(data.events)
const categoriesArray=Array.from(uniques)



//creo las categories el num es por que las id,value,for,etc tienen distintos datos
function crearCategorie(event,num) {
  return `<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox${num}" value="${event}">
  <label class="form-check-label" for="inlineCheckbox${num}">${event}</label>
          </div>`
}
function mostrarCategorie(events) {
let categorie=""
let i=1
  for (let event of events) {
     categorie += crearCategorie(event,i);
     i++
  }
  return categorie
}
const categories=mostrarCategorie(categoriesArray)
categoriesConteiner.innerHTML=categories




//events
//llamo al contenedor de los checkbox
const checkboxes=document.querySelectorAll(`.checkboxes`)
//convierto la nodelist en un array
const checkboxArray=Array.from(checkboxes)

function filtradoPorCheckbox() {
  //guardo en una nodelist los input checked
  const checkedInput=document.querySelectorAll(`input[type=checkbox]:checked`)
  //convierto en un array la nodelist
  const checkedArray=Array.from(checkedInput).map(checkbox=>checkbox.value)
  

  // filtros
  const filtrarPorCheckbox = data.events.filter((event)=>checkedArray.includes(event.category))
  const filtrarPorFecha=filtrar(filtrarPorCheckbox,moment)
  return filtrarPorFecha
}

categoriesConteiner.addEventListener("change",()=>{
  
  const filtrados=filtradoPorCheckbox()
  
  if (filtrados.length>0) {
  const tarjetasFiltradas=mostrarUpcomingEvents(filtrados)
  mainDiv.innerHTML+=tarjetasFiltradas
  }else{
    mainDiv.innerHTML=upcomingEvents
  }
})



const buscador=document.getElementById(`search`)
buscador.addEventListener(`keyup`,(e)=>{
  const buscado=buscarPorTexto(e.target.value.toLowerCase().replaceAll(" ",""),data.events)
  const cruzado=filtroCruzados(e.target.value.toLowerCase().replaceAll(" ",""),data.events)
  if (cruzado.length>0) {
    const crear=mostrarUpcomingEvents(cruzado)
    mainDiv.innerHTML+=crear
  }else{
    if (buscado.length>0) {
      const crearBuscado=mostrarUpcomingEvents(buscado)
      mainDiv.innerHTML+=crearBuscado
      }else{
        mainDiv.innerHTML="Lo lamentamos, no hay nada que concuerde con esa busqueda!"
      }
  }
  
}

)
function buscarPorTexto(e,events) {
 const buscar=[]
 for (const event of events) {
  if (event.date>moment) {
  let nombre=event.name.toLowerCase().replace(" ","")
  nombre.toLowerCase()
  if (nombre.includes(e)) {
    buscar.push(event)
  }
  }
  }
  return buscar
}



function filtroCruzados(e,events) {
  const buscado=buscarPorTexto(e,events)
  const filtrado=filtradoPorCheckbox(events)
  const mix = []
  for (const busc of buscado) {
    if ( filtrado.includes(busc) ) {
      mix.push(busc)
    }
  }
  return mix
}