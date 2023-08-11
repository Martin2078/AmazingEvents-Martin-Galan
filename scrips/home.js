const mainDiv = document.getElementById("card-conteiner")
function crearTarjeta(event)
{
    return `<div id="${event._id}" class="card" style="width: 15rem;">
    <img src="${event.image}" class="card-img-top" alt="...">
    <section class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text info">${event.description}</p>
      <div class="price-details">
        <h4>USD $${event.price}</h4>
        <a href="./pages/details.html?identifyer=${event._id}" class="btn btn-primary">Details</a>
      </div> 
    </section>
</div>`
}
function mostrarTarjetas(events){
  mainDiv.innerHTML=""
  let aux = ""
    for (const event of events) { 
        aux+=crearTarjeta(event)
    }
    return aux
}
const tarjetas = mostrarTarjetas(data.events)
mainDiv.innerHTML+=tarjetas






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
  return `<div id="div-checkbox" class="checkboxes form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox${num}" value="${event}">
  <label class="form-check-label" for="inlineCheckbox${num}">${event}</label>
          </div>`
}
//mostrar categories
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

function filtradoPorCheckbox(events) {
  //guardo en una nodelist los input checked
  const checkedInput=document.querySelectorAll(`input[type=checkbox]:checked`)
  //convierto en un array la nodelist
  const checkedArray=Array.from(checkedInput).map(checkbox=>checkbox.value)

  const filtrarPorCheckbox = events.filter((event)=>checkedArray.includes(event.category))
  return filtrarPorCheckbox
}

categoriesConteiner.addEventListener("change",()=>{
  const filtrados=filtradoPorCheckbox(data.events)
  if (filtrados.length>0) {
    const tarjetasFiltradas=mostrarTarjetas(filtrados)
    mainDiv.innerHTML+=tarjetasFiltradas
    }else{
    mainDiv.innerHTML=tarjetas
    }
})




//SEARCH
const buscador=document.getElementById(`search`)//CONTENEDOR

function buscarPorTexto(e,events) {
  const buscar=[]
  for (const event of events) {
   let nombre=event.name.toLowerCase().replace(" ","")
   nombre.toLowerCase()
   if (nombre.includes(e)) {
     buscar.push(event)
   }}
   return buscar
 }

 buscador.addEventListener(`keyup`,(e)=>{
  const buscado=buscarPorTexto(e.target.value.toLowerCase().replaceAll(" ",""),data.events)
  const cruzado=filtroCruzados(e.target.value.toLowerCase().replaceAll(" ",""),data.events)

  if (cruzado.length>0) {
    const crear=mostrarTarjetas(cruzado)
    mainDiv.innerHTML+=crear
  }else{
    if (buscado.length>0) {
      const crearBuscado=mostrarTarjetas(buscado)
    mainDiv.innerHTML+=crearBuscado
      }else{
        mainDiv.innerHTML="Lo lamentamos, no hay nada que concuerde con esa busqueda!"
      }
  }
    
})



//CRUZADOS

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



