//ESTE ARCHIVO LLAMA A LOS PAISES YA GUARDADOS EN MI DB

const { Country, Activity } = require('../db')
const { getCountriesByName } =  require('./getCountriesByName') //importo el controlador para obtener los paises por nombres


const getAllCountriesDB = async (req, res) => {
    try {
        const {name} = req.query; //obtengo el parametro name desde la consulta de la solicitud
        
        if(name){ const countryName = await getCountriesByName(name) //si el nombre existe, llamo al controlador y doy una respuesta
            return res.status(200).json(countryName)
        }

        const countries = await Country.findAll({ //si no existe el nombre, llamo a todos los paises de la DB usando findAll
            include: Activity
        });
        return res.status(200).json(countries)
        

        
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

module.exports = {
    getAllCountriesDB,
};