import Notiflix from 'notiflix';
import './css/styles.css';
// import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inp = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inp.addEventListener('input', fetchCountries);
function fetchCountries(name) {
  const coun = inp.value;
  fetch('https://restcountries.com/v3.1/name/${coun}')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      // Data handling
    })
    .catch(error => {
      // Error handling
    });
}

// fetchCountries();
