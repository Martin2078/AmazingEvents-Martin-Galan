const detailConteiner=document.getElementById(`details-box`)
const moment = data.currentDate
const parametros=location.search
const objetoURL=new URLSearchParams(parametros)
const id=objetoURL.get(`identifyer`)
const objetoEvent = data.events.find(event=>event._id===id)

function crearDetail(event,dates) {
        if (event.date>dates) {
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
    
const tarjeta=crearDetail(objetoEvent,moment)
detailConteiner.innerHTML=tarjeta
