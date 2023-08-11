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
        <a href="./pages/details.html" class="btn btn-primary">Details</a>
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
    for (const event of events) {
      aux += crearTarjeta(event)
    }
    return aux
}

const upcomingEvents= mostrarUpcomingEvents(upcoming)
mainDiv.innerHTML+=upcomingEvents


