const statisticsTable=document.getElementById(`statisticsTable`)
const pastStatisticsTable=document.getElementById(`pastStatisticsTable`)
const upcomingStatisticsTable=document.getElementById(`upcomingStatisticsTable`)

import {filtrarPast,filtrarUpcoming,uniquesCategory,crearFilas,mostrarStatistics,cadaUno,filtrado} from "../modules/functions.js"

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


