//The top 5 most populous countries in South America are:   ------------------------------------------------
let southAmerica = [
    { country : "Brazil", population : 211000000, capital : "Brasilia", currency: "Brazilian real" },
    { country : "Colombia", population : 50340000, capital : "Bogota", currency: "Colombian peso" },
    { country : "Argentina", population : 44940000, capital : "Buenos Aires", currency: "Argentine peso" },
    { country : "Peru",     population : 32510000, capital : "Lima", currency: "Sol" },
    { country : "Venezuela", population: 28520000, capital : "Caracas", currency: "Bolivar" }
    ];

// getAll------------------
const getAll = () => {
    return  southAmerica;
};
console.log(getAll())

// getItem------------------
 const getItem = (countryName) => {
    return southAmerica.find((country) => { 
            return country.country == countryName;
         });
  }

//Exports------------------------------------------------
export { getItem, getAll};

