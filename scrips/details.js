const detailConteiner=document.getElementById(`details-box`)
let moment 
let dataEvents=[]
fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
 .then(respuesta=>respuesta.json())
  .then(respuesta=>{
  moment=respuesta.currentDate
  dataEvents=respuesta.events

  const parametros=location.search
  const objetoURL=new URLSearchParams(parametros)
  const id=objetoURL.get(`identifyer`)
  const objetoEvent = dataEvents.find(event=>event._id==id)
  
  const tarjeta=crearDetail(objetoEvent,moment)
  detailConteiner.innerHTML=tarjeta
})
.catch(error=>console.log(error))





function crearDetail(event,actual) {
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
    

