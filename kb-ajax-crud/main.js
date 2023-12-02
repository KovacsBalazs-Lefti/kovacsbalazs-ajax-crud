//adatállomány letárolása
const api_url ="https://retoolapi.dev/PWMWqI/service"

//oldalbetöltés
document.addEventListener("DOMContentLoaded", () => {
  //lekérése változóban
  
  //tábla feltöltése az url-n lévő értékekkel
  //válasz szöveggé alakítása
  //form lekérése
  const personForm = document.getElementById("personForm");
  //aszinkron mód: függvény meghívása fut
  //eseménykezelő hozzáadása űrlaphoz
  personForm.addEventListener("submit", sprovider);
  listPerson();
 
});

async function sprovider(event){
  event.preventDefault(); //esemény letiltása, hogy js-kódot használva küldje el az infókat
  //adat amit szeretnék felvenni, ehhez lekérdezzük a űrlapot
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const interest = document.getElementById('interest').value;
  const phone_number = document.getElementById('phone_number').value;
  const service_date = document.getElementById('service_date').value;
  //fenti adatokból létrehozunk egy objektumot
  const person = {
    name: name,
    email: email,
    interest: interest,
    phone_number: phone_number,
    service_date: service_date
  };
  //listázás, először végig kell futtatni
  const response = await fetch(api_url, {
    method: "POST",
    body: json.stringify(person),
    //meg kell adni, hogy a szervernek milyen típusú infókat küldünk ezért léterhozunk egy headert
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    listPerson();
    resetForm();
  }
}
function resetForm() {
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('interest').value = "";
  document.getElementById('phone_number').value = "";
  document.getElementById('service_date').value = "";
}

function listPerson() {
  const serviceTable = document.getElementById("serviceTable");
  fetch(api_url).then(httpResponse => httpResponse.json())
  .then(responseBody => {
    serviceTable.innerHTML = "";
    responseBody.forEach(person => {
      const tableRow = document.createElement("tr"); //létrehozom a sorokat
      const idTableData = document.createElement("td");
      const nameTableData = document.createElement("td");
      const emailTableData = document.createElement("td");
      const interestData = document.createElement("td");
      const phone_numberData = document.createElement("td");
      const service_dateData = document.createElement("td");
      //műveletek oszlophoz kapcsolodo infok
      const actionsData = document.createElement("td");
      const deleteButton = document.createElement("button");
      //törlésgomb felirata-torles
      deleteButton.textContent = "Törlés";
      // deleteperson függvény, ami 1 db embert töröl a táblázatból
      deleteButton.addEventListener("click",() => deletePerson(person.id));
      actionsData.appendChild(deleteButton)
      idTableData.textContent = person.id;
      nameTableData.textContent = person.name;
      emailTableData.textContent = person.email;
      interestData.textContent = person.interest;
      phone_numberData.textContent = person.phone_number;
      service_dateData.textContent = person.service_date;
      //oszlopok felvétele
      tableRow.appendChild(idTableData);
      tableRow.appendChild(nameTableData);
      tableRow.appendChild(emailTableData);
      tableRow.appendChild(interestData);
      tableRow.appendChild(phone_numberData);
      tableRow.appendChild(service_dateData);
      //actions cella
      tableRow.appendChild(actionsData);
      serviceTable.appendChild(tableRow); // feltoltom a sorokat
    });
  });
}
async function deletePerson(id) {
  const response = await fetch(`${api_url}+ "/" + ${id}`, {method: "DELETE"});
  //UJRALISTÁZÁS
  if (response.ok){
    listPerson();
  }
}