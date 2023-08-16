import { mainDiv,uniques,categoriesConteiner,checkboxes,checkboxArray,buscador,crearTarjeta,mostrarTarjetas,uniquesCategory,crearCategorie,mostrarCategorie,filtradoPorCheckbox,buscarPorTexto } from "../modules/functions.js"

let dataEvents=[]
fetch('https://mindhub-xj03.onrender.com/api/amazing')
 .then(respuesta=>respuesta.json())
 .then(respuesta=>{
  dataEvents=respuesta.events
  const tarjetas = mostrarTarjetas(dataEvents)
  mainDiv.innerHTML+=tarjetas

uniquesCategory(dataEvents,uniques)
const categoriesArray=Array.from(uniques)
const categories=mostrarCategorie(categoriesArray)
categoriesConteiner.innerHTML=categories

categoriesConteiner.addEventListener("change",()=>{
  const buscado=buscarPorTexto(buscador.value.toLowerCase().replaceAll(" ",""),dataEvents)
  const cruzado=filtradoPorCheckbox(buscado)
    if (cruzado.length>0) {
      const crear=mostrarTarjetas(cruzado)
      mainDiv.innerHTML+=crear
    }else{
      mainDiv.innerHTML="Lo lamentamos,no hay nada que concuerde con ese busqueda!"
    }
})
buscador.addEventListener(`keyup`,(e)=>{
  const buscado=buscarPorTexto(e.target.value.toLowerCase().replaceAll(" ",""),dataEvents)
  const cruzado=filtradoPorCheckbox(buscado)

    if (cruzado.length>0) {
      const crear=mostrarTarjetas(cruzado)
      mainDiv.innerHTML+=crear
    }else{
      mainDiv.innerHTML="Lo lamentamos,no hay nada que concuerde con ese busqueda!"
    }
})

})
 .catch(error=>console.log(error))











 


