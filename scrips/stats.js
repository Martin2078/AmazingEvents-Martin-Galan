const statisticsTable=document.getElementById(`statisticsTable`)
const pastStatisticsTable=document.getElementById(`pastStatisticsTable`)
const upcomingStatisticsTable=document.getElementById(`upcomingStatisticsTable`)

import {filtrarPast,filtrarUpcoming,uniquesCategory} from "../modules/functions.js"

let moment 
let dataEvents=[]
fetch("https://mindhub-xj03.onrender.com/api/amazing")
 .then(respuesta=>respuesta.json())
  .then(respuesta=>{
    moment=respuesta.currentDate
    dataEvents=respuesta.events


    const past=filtrarPast(dataEvents,moment)
    const uniquesPast=new Set()
    uniquesCategory(past,uniquesPast)
    const categoriesPastArray=Array.from(uniquesPast)

    const eventosPasados=filtrado("category",past,categoriesPastArray,"assistance")

    const filasPast=crearFilas(eventosPasados)
    pastStatisticsTable.innerHTML+=filasPast
    



    const upcoming=filtrarUpcoming(dataEvents,moment)
    const uniquesUpcoming=new Set()
    uniquesCategory(upcoming,uniquesUpcoming)
    const categoriesUpcomingArray=Array.from(uniquesUpcoming)

    const eventosFuturos=filtrado("category",upcoming,categoriesUpcomingArray,"estimate")

    const filasUpcoming=crearFilas(eventosFuturos)
    upcomingStatisticsTable.innerHTML+=filasUpcoming


    const statisticsPast=cadaUno(past,"past")
    const statisticsUpcoming=cadaUno(upcoming,"upcoming")
    const statistics=statisticsPast.concat(statisticsUpcoming)
    
    const higuest = statisticsPast.sort((a,b)=>{return b.porcentajeAssist-a.porcentajeAssist}).slice(0,1)
    const lowest = statisticsPast.sort((a,b)=>{return a.porcentajeAssist-b.porcentajeAssist}).slice(0,1)
    const larger = statistics.sort((a,b)=>{return b.capacity-a.capacity}).slice(0,1)
    
    const filaStatistics=mostrarStatistics(higuest,lowest,larger)
    statisticsTable.innerHTML+=filaStatistics
})
.catch(error=>console.log(error))


function crearFilas(events) {
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
function mostrarStatistics(higuest,lowest,largerCapacity) {
    let trs=`<tr>
        <td>${higuest[0].name} (${higuest[0].porcentajeAssist}%)</td>
        <td>${lowest[0].name} (${lowest[0].porcentajeAssist}%)</td>
        <td>${largerCapacity[0].name} (${largerCapacity[0].capacity})</td>
        </tr>`
    
    return trs
}
function cadaUno(events,cuando) {
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


function filtrado(key,events,categorie,prop) {
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