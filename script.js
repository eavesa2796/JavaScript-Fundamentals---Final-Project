//get all output elements
const dogOutput = document.getElementById("dog-output");
const catOutput = document.getElementById("cat-output");
const weatherOutput = document.getElementById("weather-output");
const currencyOutput = document.getElementById("currency-output");
const moviesOutput = document.getElementById("movies-output");
const githubOutput = document.getElementById("github-output");
const jokeOutput = document.getElementById("joke-output");
const pokemonOutput = document.getElementById("pokemon-output");

//get all spiunner elements
const dogSpinner = document.getElementById("dog-spinner");
const catSpinner = document.getElementById("cat-spinner");
const weatherSpinner = document.getElementById("weather-spinner");
const currencySpinner = document.getElementById("currency-spinner");
const movieSpinner = document.getElementById("movies-spinner");
const githubSpinner = document.getElementById("github-spinner");
const jokeSpinner = document.getElementById("joke-spinner");
const pokemonSpinner = document.getElementById("pokemon-spinner");

//one main function that handles fetch, error handling, output building, showing/hiding spinner, and enabling/disabling buttons
async function fetchWithSpinner({
  url,
  outputEl,
  spinnerEl,
  buttonEl,
  transform,
}) {
  //clear previous output
  outputEl.innerHTML = "";

  //show spinner + disable button
  spinnerEl.style.display = "block";
  buttonEl.disabled = true;
  buttonEl.style.opacity = ".6";

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    //Transform = function for custom output of this API
    const html = transform(data);

    outputEl.innerHTML = html;
  } catch (err) {
    outputEl.textContent = "⚠️ Error loading data.";
    console.error(err);
  } finally {
    //hide spinner + enable button
    spinnerEl.style.display = "none";
    buttonEl.disabled = false;
    buttonEl.style.opacity = "1";
  }
}

function getDogImage() {
  fetchWithSpinner({
    url: "https://dog.ceo/api/breeds/image/random",
    outputEl: dogOutput,
    spinnerEl: dogSpinner,
    buttonEl: document.querySelector("#dog-api button"),
    transform: (data) => `<img src="${data.message}" alt="Random Dog Image" />`,
  });
}

function getCatImage() {
  fetchWithSpinner({
    url: "https://api.thecatapi.com/v1/images/search",
    outputEl: catOutput,
    spinnerEl: catSpinner,
    buttonEl: document.querySelector("#cat-api button"),
    transform: (data) => `<img src="${data[0].url}" alt="Random Cat Image" />`,
  });
}

function getWeather() {
  fetchWithSpinner({
    url: "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timeformat=unixtime&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch",
    outputEl: weatherOutput,
    spinnerEl: weatherSpinner,
    buttonEl: document.querySelector("#weather-api button"),
    transform: (data) =>
      `Current Temperature: ${data.hourly.temperature_2m[0]}°F`,
  });
}

function getExchangeRates() {
  fetchWithSpinner({
    url: "https://v6.exchangerate-api.com/v6/5e9ff0cbb4eb8da5781ecf10/latest/USD",
    outputEl: currencyOutput,
    spinnerEl: currencySpinner,
    buttonEl: document.querySelector("#currency-api button"),
    transform: (data) => `1 USD = ${data.conversion_rates.EUR} EUR`,
  });
}

function getMovies() {
  fetchWithSpinner({
    url: "https://api.themoviedb.org/3/movie/popular?api_key=69fc07bc22d6077d4aa27565f999c5cc",
    outputEl: moviesOutput,
    spinnerEl: movieSpinner,
    buttonEl: document.querySelector("#movies-api button"),
    transform: (data) => `Most Popular Movie: ${data.results[0].title}`,
  });
}

function getGitHubUser() {
  const usernameInput = document.getElementById("github-input");
  const username = document.getElementById("github-input").value.trim();
  if (!username) {
    githubOutput.textContent = "⚠️ Please enter a Github username.";
    return;
  }

  fetchWithSpinner({
    url: `https://api.github.com/users/${username}`,
    outputEl: githubOutput,
    spinnerEl: githubSpinner,
    buttonEl: document.querySelector("#github-api button"),
    transform: (data) => {
      if (data.message === "Not Found") {
        return "❌ User not found!";
      }
      return `
        <h3>${data.login}</h3>
        <img src="${data.avatar_url}" width="120" />
        <p>Public Repos: ${data.public_repos}</p>
        <p>Followers: ${data.followers}</p>
      `;
    },
  });
}

function getJoke() {
  fetchWithSpinner({
    url: "https://official-joke-api.appspot.com/random_joke",
    outputEl: jokeOutput,
    spinnerEl: jokeSpinner,
    buttonEl: document.querySelector("#joke-api button"),
    transform: (data) => `${data.setup} - ${data.punchline}`,
  });
}

function getPublicApiInfo() {
  const pokemonInput = document.getElementById("pokemon-input");
  const searchValue = document
    .getElementById("pokemon-input")
    .value.trim()
    .toLowerCase();

  if (!searchValue) {
    pokemonOutput.textContent = "⚠️ Please enter a Pokemon name of ID.";
    return;
  }

  fetchWithSpinner({
    url: `https://pokeapi.co/api/v2/pokemon/${searchValue}`,
    outputEl: pokemonOutput,
    spinnerEl: pokemonSpinner,
    buttonEl: document.querySelector("#pokemon-api button"),
    transform: (data) => `<h3 style="text-transform: capitalize;">${
      data.name
    }</h3>
      <img src="${data.sprites.front_default}" width="120" />
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Type:</strong> ${data.types
        .map((t) => t.type.name)
        .join(", ")}</p>`,
  });
}
