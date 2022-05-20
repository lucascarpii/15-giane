import { getTask } from "./firebase.js";

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
const invitadoname = document.querySelector("#invitadoname");
const cantinv = document.querySelector("#cantinv");

function tomateElPalo(){
location.href = "404.html";
}

window.addEventListener("DOMContentLoaded", async () => {
  if (location.search == "") {
    tomateElPalo()
  }

  let result = getParameterByName("idin");
  if(result == ''){
    tomateElPalo()
  }
  let resultObj = await getTask(result);
  let invitado = resultObj.data();


  if (!invitado) {
    tomateElPalo()
  } else {
    let cantidad = invitado.description;
    let invitaciones = "invitación";
    if (cantidad > 1) {
      invitaciones = "invitaciones";
    }
    invitadoname.innerText = invitado.title;
    cantinv.innerText = `Vale por ${cantidad} ${invitaciones}`;
  }
});
