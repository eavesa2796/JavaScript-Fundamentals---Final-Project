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
