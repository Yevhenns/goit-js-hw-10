function fetchCountries(name)
  fetch('https://restcountries.com/v3.1/name/#{name}')
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


// export { fetchCountries };
