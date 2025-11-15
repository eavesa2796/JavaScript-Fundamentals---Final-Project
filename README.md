# JavaScript API Dashboard

A small front-end project that showcases how to work with multiple public APIs using HTML, CSS, and modern JavaScript (ES6+). It uses a reusable fetch helper, loading spinners, and dynamic UI updates with search inputs.

## Features

- Reusable `fetchWithSpinner()` function for all API requests
- Individual cards for each API endpoint
- Loading spinners while data is being fetched
- Disabled buttons during requests to prevent duplicate calls
- Search support for:
  - GitHub users
  - Pokémon by name or ID
- Responsive layout built with CSS Grid

## APIs Used

- Dog API – random dog image  
- The Cat API – random cat image  
- Open-Meteo – weather information  
- ExchangeRate API – currency conversion (USD → EUR)  
- TMDB API – popular movies  
- GitHub REST API – user lookup  
- Official JokeAPI – random jokes  
- PokéAPI – Pokémon lookup

## Project Structure

```text
project/
├── index.html
├── style.css
├── script.js
└── README.md
```
---
##Core Fetch Helper
```code
async function fetchWithSpinner({
  url,
  outputEl,
  spinnerEl,
  buttonEl,
  transform,
}) {
  // Clear previous output
  outputEl.innerHTML = "";

  // Show spinner + disable button
  spinnerEl.style.display = "block";
  buttonEl.disabled = true;
  buttonEl.style.opacity = "0.6";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const html = transform(data);
    outputEl.innerHTML = html;
  } catch (err) {
    outputEl.textContent = "⚠️ Error loading data.";
    console.error(err);
  } finally {
    // Hide spinner + enable button
    spinnerEl.style.display = "none";
    buttonEl.disabled = false;
    buttonEl.style.opacity = "1";
  }
}
```

---
##Possible Enhancements

- Add dark mode support
- Add error toasts instead of plain text messages
- Add more APIs (e.g., NASA, trivia, news)
- Cache responses in localStorage
- Add transitions/animations for card updates
