//ESTE ARCHIVO LLAMA A LOS PAISES YA GUARDADOS EN MI DB

const { Country, Activity } = require('../db')
const { getCountriesByName } =  require('./getCountriesByName')


const getAllCountriesDB = async (req, res) => {
    try {
        const {name} = req.query;
        
        if(name){ const countryName = await getCountriesByName(name)
            return res.status(200).json(countryName)
        }

        const countries = await Country.findAll({
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