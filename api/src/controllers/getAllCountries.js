const axios = require('axios');
const {Country} = require('../db')

//esta funcion llamará a todos aquellos paises que estan en la API
const getAllCountries = async () => {
    
    const {data} = await axios("http://localhost:5000/countries")
    data.map(async (newCountry) => { //itero sobre los paises guardados en data
    await Country.findOrCreate({//por cada pais, busco un pais con la id "cca3", si no existe lo creo con los detalles proporcionados mas abajo
            where: {
                id: newCountry.cca3 //cca3 hace referencia a un codigo de tres letras representante del pais, ejemplo "KEN" para Kenya
            },
            defaults: {
                name: newCountry.name.common,
                flag_image: newCountry.flags.png,
                continents: newCountry.continents[0],
                capital: newCountry.capital ? newCountry.capital[0] : null,
                population: newCountry.population
            }
        })
    })

}

module.exports = {
    getAllCountries,
}