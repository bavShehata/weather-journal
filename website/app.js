// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const keyAPI = "&appid=dd4721a67ec742e1427aa14c7248b320";

// Event listener to remove existing HTML DOM element
const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", deleteData.bind(this));

function deleteData() {
  fetch("/all", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  errorMsg.style.display = "none";
  updateUI();
}
// Storing an error in entering the City
var errorFlag;

// Event listener to add function to existing HTML DOM element

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", weatherProcess.bind(this));

/* Function called by event listener */
function weatherProcess() {
  const city = document.querySelector("#city").value;
  const language = document.querySelector("#language").value;
  const units = selectedUnit();
  const lang = "&lang=" + language;
  const uni = "&units=" + units.param;
  const paramaters = city + lang + uni;
  const userData = {
    city,
    language,
    units,
    fact: document.querySelector("#fact").value,
  };
  function selectedUnit() {
    const rbs = document.querySelectorAll("#unitChoice input[type=radio]");
    var chosen;
    rbs.forEach((rb) => {
      if (rb.checked) {
        chosen = {
          param: rb.dataset.unit_type,
          value: rb.value,
        };
      }
    });
    return chosen;
  }
  getAPI(baseURL + paramaters + keyAPI).then((data) => {
    postData("/", { ...data, ...userData });
    updateUI();
  });
}
/* Function to GET Web API Data*/
const errorMsg = document.querySelector(".error");
async function getAPI(url) {
  const response = await fetch(url);
  if (response.ok) {
    errorMsg.style.display = "none";
    errorFlag = false;
    const data = await response.json();
    return data;
  } else {
    errorMsg.style.display = "inline";
    errorFlag = true;
  }
}
/* Function to POST data */
async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log(err);
  }
}
/* Function to GET Project Data */
async function updateUI(adding) {
  const response = await fetch("/all");

  try {
    //Updating the UI
    const data = await response.json();
    const outputDiv = document.querySelector("#output");
    outputDiv.innerHTML = "";
    var i = 0;
    data.forEach((entry) => {
      console.log(entry);
      outputDiv.innerHTML += `
      <h3>${entry.city}</h3>
      <ul id="${i}">
        <li class="units">temparture in: ${entry.units}</li>
        <li class="weather">The weather is: ${entry.description}</li>
        <li class="min">Minimum temparture: ${entry.temp_min}</li>
        <li class="max">Maximum temparture: ${entry.temp_max}</li>
        <li class="avg">The average temparture is: ${entry.temp}</li>
        <li class="hum">The humidity is: ${entry.humidity}</li>
        <li class="fact">A fun fact about the city is that it is: ${entry.fact}</li>
      </ul><br /><br />`;
      i++;
    });
    if (!errorFlag) document.querySelector("ul").scrollIntoView();
    else document.querySelector("body").scrollIntoView();
  } catch (error) {
    console.log(error);
  }
}
