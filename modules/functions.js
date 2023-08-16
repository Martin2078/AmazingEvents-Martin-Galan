export function crearTarjeta(event)
{
    return `<div id="${event._id}" class="card" style="width: 15rem;">
    <img src="${event.image}" class="card-img-top" alt="...">
    <section class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text info">${event.description}</p>
      <div class="price-details">
        <h4>USD $${event.price}</h4>
        <a href="../pages/details.html?identifyer=${event._id}" class="btn btn-primary">Details</a>
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



export function crearDetail(event,actual) {
  if (event.date>actual) {
    return  `<div class="card mb-3 col-md-8 details-card" >
  <div class="row g-0">
    <div class="col-md-6">
      <img id="img-detail" src="${event.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-6">
      <section class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text details">${event.description}</p>
        <p class="card-text details">Date: ${event.date}</p>
        <p class="card-text details">Place: ${event.place}</p>
        <p class="card-text details">Capacity: ${event.capacity}</p>
        <p class="card-text details">Estimate: ${event.estimate}</p>
        <p class="card-text details">Price: USD $${event.price}</p>
      </section>
    </div>
  </div>
</div>`
  }else{
      return `<div class="card mb-3 col-md-8 details-card" >
      <div class="row g-0">
        <div class="col-md-6">
          <img id="img-detail" src="${event.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-6">
          <section class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text details">${event.description}</p>
            <p class="card-text details">Date: ${event.date}</p>
            <p class="card-text details">Place: ${event.place}</p>
            <p class="card-text details">Capacity: ${event.capacity}</p>
            <p class="card-text details">Assistance: ${event.assistance}</p>
            <p class="card-text details">Price: USD $${event.price}</p>
          </section>
        </div>
      </div>
  </div>`
  }
}


export function crearFilas(events) {
  let trs=""
  for (const event of events) {
      trs+=`<tr>
      <td>${event.category}</td>
      <td>$${event.revenue}</td>
      <td>${event.porcentajeAssist}%</td>
      </tr>`
  }
  return trs
}
export function mostrarStatistics(higuest,lowest,largerCapacity) {
  let trs=`<tr>
      <td>${higuest[0].name} (${higuest[0].porcentajeAssist}%)</td>
      <td>${lowest[0].name} (${lowest[0].porcentajeAssist}%)</td>
      <td>${largerCapacity[0].name} (${largerCapacity[0].capacity})</td>
      </tr>`
  
  return trs
}

export function cadaUno(events,cuando) {
const porcentajeCadaUno=[]
if (cuando==="past") {
  for (const event of events) {
      let capacity=event.capacity
      let porcentajeAssist=((event.assistance*100)/capacity).toFixed(2)
          porcentajeCadaUno.push({
              name:event.name,
              capacity:capacity,
              porcentajeAssist:porcentajeAssist,
          })
          }
}else{
  for (const event of events) {
      let capacity=event.capacity
      let porcentajeAssist=((event.estimate*100)/capacity).toFixed(2)
          porcentajeCadaUno.push({
              name:event.name,
              capacity:capacity,
              porcentajeAssist:porcentajeAssist,
          })
          }
}
 
  return porcentajeCadaUno
  }


export function filtrado(key,events,categorie,prop) {
const arrayObjetos=[]
 for (let i = 0; i < categorie.length; i++) {
  let revenue=0
  let capacity=0
  let porcentajeAssist=0

  const result = events.filter(c => c[key] === categorie[i]);
  for (const element of result) {
      revenue += (element[prop]*element.price)
  }
  for (const element of result) {
      capacity += element.capacity
  }
  for (const element of result) {
      porcentajeAssist += element[prop]
  }
  porcentajeAssist=((porcentajeAssist*100)/capacity).toFixed(2)
  
  
  arrayObjetos.push({
      category:categorie[i],
      revenue:revenue.toLocaleString("es-ES"),
      capacity:capacity,
      porcentajeAssist:porcentajeAssist,
  })
 }
  return arrayObjetos         
}