export function crearTarjeta(event)
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

export function mostrarTarjetas(events){
    mainDiv.innerHTML=""
    let aux = ""
      for (const event of events) { 
          aux+=crearTarjeta(event)
      }
      return aux
  }

  export function filtrarPast(events,date) {
    const evento=[]
    for (const event of events) {
      if (date>event.date) {
        evento.push(event)
      }  
    }
    return evento
  }
  
  export function filtrarUpcoming(events,date) {
    const evento=[]
    for (const event of events) {
      if (date<event.date) {
        evento.push(event)
      }  
    }
    return evento
  }
  
export function uniquesCategory(events,name) {
  for (const event of events) {
    name.add(`${event.category}`)
  }
}



export function crearCategorie(event,num) {
    return `<div id="div-checkbox" class="checkboxes form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox${num}" value="${event}">
    <label class="form-check-label" for="inlineCheckbox${num}">${event}</label>
            </div>`
  }

export function mostrarCategorie(events) {
    let categorie=""
    let i=1
      for (let event of events) {
         categorie += crearCategorie(event,i);
         i++
      }
      return categorie
    }


export function filtradoPorCheckbox(events) {
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

export function buscarPorTexto(e,events) {
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


//contenedor tarjetas
export const mainDiv = document.getElementById("card-conteiner")


export const categoriesConteiner=document.getElementById(`categories-div`)
//creo un set(sin repetir) de categories y añado las que no se repitan
export const uniques= new Set();

//contenedor filtros
export const checkboxes=document.querySelectorAll(`.checkboxes`)
export const checkboxArray=Array.from(checkboxes)
export const buscador=document.getElementById(`search`)



