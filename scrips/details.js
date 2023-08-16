const detailConteiner=document.getElementById(`details-box`)
let moment 
let dataEvents=[]
import { crearDetail } from "../modules/functions.js"

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
