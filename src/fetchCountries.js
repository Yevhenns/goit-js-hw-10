export { fetchCountries };

async function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
