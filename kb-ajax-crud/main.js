//adatállomány letárolása
import "./style.css";
const api_url ="https://retoolapi.dev/PWMWqI/service"


//oldalbetöltés
document.addEventListener("DOMContentLoaded", () => {
  //lekérése változóban
  
  //tábla feltöltése az url-n lévő értékekkel
  //válasz szöveggé alakítása
  //form lekérése
  
  const personForm = document.getElementById("personForm");
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", resetForm);
  //aszinkron mód: függvény meghívása fut
  //eseménykezelő hozzáadása űrlaphoz
  personForm.addEventListener("submit", handleProviderform);
  listPerson();
 
});
function handleProviderform(event){
  event.preventDefault();
  const id = document.getElementById("id").value;
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
  if (id == "") {
    addProvider(person);
  }else{
    updatePerson(id, person);
  }
}

async function updatePerson(id, person){
  const response = await fetch(`${api_url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok){
    resetForm();
    listPerson();
  }
}

async function addProvider(person){
  //event.preventDefault(); //esemény letiltása, hogy js-kódot használva küldje el az infókat
  //adat amit szeretnék felvenni, ehhez lekérdezzük a űrlapot
  
 
  //listázás, először végig kell futtatni - elkuldjuk a szervernek
  
  const response = await fetch(api_url, {
    method: "POST",
    body: JSON.stringify(person),
    //meg kell adni, hogy a szervernek milyen típusú infókat küldünk ezért léterhozunk egy headert
    headers: {
      "Content-Type": "application/json"
    }
  });
 
  if (response.ok) {
    resetForm();
    listPerson();
  }
}
//űrlap alaphelyzetbe állítása
function resetForm() {
  document.getElementById('id').value = "";
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('interest').value = "";
  document.getElementById('phone_number').value = "";
  document.getElementById('service_date').value = "";
  document.getElementById("updateButton").classList.add('hide');
  document.getElementById("submitButton").classList.remove('hide');
}

function listPerson() {
  const serviceTable = document.getElementById("serviceTable");
  fetch(api_url).then(httpResponse => httpResponse.json())
  .then(responseBody => {
    serviceTable.innerHTML = "";
    responseBody.forEach((person, index) => {
      const tableRow = document.createElement("tr");

        if (index % 2 === 0) {
          tableRow.classList.add("table-light");
        }else{
          tableRow.classList.add("table-dark");
        }
      
      const idTableData = document.createElement("td");
      const nameTableData = document.createElement("td");
      const emailTableData = document.createElement("td");
      const interestData = document.createElement("td");
      const phone_numberData = document.createElement("td");
      const service_dateData = document.createElement("td");
      //műveletek oszlophoz kapcsolodo infok
      const actionsData = document.createElement("td");
      const updateButton = document.createElement("button");
      updateButton.classList.add("costum-update-button");
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("costum-delete-button");
      // módosítás oszlopba, módosítás gomb
      updateButton.textContent = "Módosít";
      //törlésgomb felirata-torles
      deleteButton.textContent = "Törlés";
      // deleteperson függvény, ami 1 db embert töröl a táblázatból
      
      updateButton.addEventListener("click",() => fillUpdateForm(person.id));
      deleteButton.addEventListener("click",() => deletePerson(person.id));
      
      actionsData.appendChild(updateButton);
      actionsData.appendChild(deleteButton);
      
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
  const response = await fetch(`${api_url}/${id}`, {method: "DELETE"});
  //UJRALISTÁZÁS
  if (response.ok){
    listPerson();
  }
}
async function fillUpdateForm(id){
  const response = await fetch(`${api_url}/${id}`);
  if (!response.ok){
    alert("Hiba történt a lekérdezben");
    return;
  }
  const person = await response.json();
  document.getElementById("id").value = person.id;
  document.getElementById("name").value = person.name;
  document.getElementById("email").value = person.email;
  document.getElementById("interest").value = person.interest;
  document.getElementById("phone_number").value = person.phone_number;
  document.getElementById("service_date").value = person.service_date;
  document.getElementById("submitButton").classList.add('hide');
  document.getElementById("updateButton").classList.remove('hide');
}