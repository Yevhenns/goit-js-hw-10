import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  evt.preventDefault();
  const countryName = refs.inputSearch.value.trim();
  if (!countryName) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(countryName).then(renderCountries).catch(onError);
}

function renderCountries(countries) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countries.length > 2 && countries.length < 10) {
    const markupList = countries
      .map(({ flags, name }) => {
        return `<li class="country-list__item" style="display: flex; margin-bottom: 20px">
            <img class = "image" src="${flags.svg}" alt="" width="60" height="40" style="margin-right: 20px">
            <h2 class="country-list__title" style="margin: 0">${name.official}</h2>
            </li>`;
      })
      .join('');

    refs.countryList.setAttribute('style', 'list-style: none; padding-left: 0');

    refs.countryList.innerHTML = markupList;
  }

  if (countries.length === 1) {
    const markupCountry = countries
      .map(({ flags, name, capital, population, languages }) => {
        return `<img  src="${flags.svg}" alt="${
          name.official
        }" width="60" height="40">
                 <h2 class = "official">${name.official}</h2>
                 <div class = "discription">
                 <p><span>Capital:</span> ${capital}</p>
                 <p><span>Population:</span> ${population}</p>
                 <p><span>Languages:</span> ${Object.values(
                   languages
                 )}</Object></p>
                 </div>`;
      })
      .join('');
    refs.countryInfo.innerHTML = markupCountry;
  }
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
}
