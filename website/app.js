// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const keyAPI = "&appid=dd4721a67ec742e1427aa14c7248b320";

// Event listener to remove existing HTML DOM element
const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", deleteData.bind(this));

function deleteData() {
  axios.delete("/all").then(() => {
    errorMsg.style.display = "none";
    updateUI();
  });
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
  // const mode = "&mode=xml";
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
  const response = await axios(url);
  try {
    errorMsg.style.display = "none";
    errorFlag = false;
    const data = response.data;
    return data;
  } catch {
    errorMsg.style.display = "inline";
    errorFlag = true;
  }
}
/* Function to POST data */
async function postData(url, data) {
  const response = await axios.post(url, { data });
  try {
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
/* Function to GET Project Data */
async function updateUI(adding) {
  const response = await axios("/all");

  try {
    //Updating the UI
    const data = response.data;
    const outputDiv = document.querySelector("#output");
    outputDiv.innerHTML = "";
    if (!isEmpty(data)) {
      outputDiv.innerHTML += `
      <h3>${data.city}</h3>
      <ul>
        <li class="units">temparture in: ${data.units}</li>
        <li class="weather">The weather is: ${data.description}</li>
        <li class="min">Minimum temparture: ${data.temp_min}</li>
        <li class="max">Maximum temparture: ${data.temp_max}</li>
        <li class="avg">The average temparture is: ${data.temp}</li>
        <li class="hum">The humidity is: ${data.humidity}</li>
        <li class="date">The date of this info in YYYY-MM-DD Format: ${data.date}</li>
        <li class="fact">A fun fact about the city is that it is: ${data.fact}</li>
      </ul><br /><br />`;
    }
    if (!errorFlag) document.querySelector("ul").scrollIntoView();
    else document.querySelector("body").scrollIntoView();
  } catch (error) {
    console.log(error);
  }
}

//Check if an object is empty
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
