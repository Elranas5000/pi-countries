const { Country, Activity } = require('../db')
const { Op } = require('sequelize')

const getCountriesByName = async (name) => {

    const countryName = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: Activity
    });
    if (!countryName.length) throw Error('No se encontraron países que coincidan con la búsqueda.')

    return countryName



}

module.exports = {
    getCountriesByName
};