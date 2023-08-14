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
    if (date>event.date) {
      evento.push(event)
    }  
  }
  return evento
}
const past=filtrar(data.events,moment)

function mostrarPastEvents(PastE){
  let aux = ""
  mainDiv.innerHTML=""
    for (const past of PastE) { 
        aux += crearTarjeta(past); 
    }
    return aux
}
const pastEvents= mostrarPastEvents(past)
mainDiv.innerHTML+=pastEvents







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

//CHECKBOX
//llamo al contenedor de los checkbox
const checkboxes=document.querySelectorAll(`.checkboxes`)//CONTENEDORES
//convierto la nodelist en un array
const checkboxArray=Array.from(checkboxes)
const buscador=document.getElementById(`search`)//CONTENEDOR

function filtradoPorCheckbox(events) {
  //guardo en una nodelist los input checked
  const checkedInput=document.querySelectorAll(`input[type=checkbox]:checked`)
  if (checkedInput.length===0) {
    return events
  }
  //convierto en un array la nodelist
  const checkedArray=Array.from(checkedInput).map(checkbox=>checkbox.value)
  const filtrarPorCheckbox = events.filter((event)=>checkedArray.includes(event.category))
  return filtrarPorCheckbox
}


categoriesConteiner.addEventListener("change",()=>{
  const buscado=buscarPorTexto(buscador.value.toLowerCase().replaceAll(" ",""),past)
  const cruzado=filtradoPorCheckbox(buscado)

    if (cruzado.length>0) {
      const crear=mostrarPastEvents(cruzado)
      mainDiv.innerHTML+=crear
    }else{
      mainDiv.innerHTML="Lo lamentamos,no hay nada que concuerde con ese busqueda!"
    }

})

console.log(buscador.value.length);


//SEARCH


function buscarPorTexto(e,events) {
  const buscar=[]
  if (e.length===0) {
    return events
  }
  for (const event of events) {
   let nombre=event.name.toLowerCase().replace(" ","")
   if (nombre.includes(e)) {
     buscar.push(event)
   }}
   return buscar
 }

 buscador.addEventListener(`keyup`,(e)=>{
  const buscado=buscarPorTexto(e.target.value.toLowerCase().replaceAll(" ",""),past)
  const cruzado=filtradoPorCheckbox(buscado)
  
    if (cruzado.length>0) {
      const crear=mostrarPastEvents(cruzado)
      mainDiv.innerHTML+=crear
    }else{
      mainDiv.innerHTML="Lo lamentamos,no hay nada que concuerde con ese busqueda!"
    }
  
    
  
    
})
