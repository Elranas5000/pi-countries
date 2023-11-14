const { Country, Activity } = require('../db');

const getCountryById = async (req, res) => {
    try {
        const {idPais} = req.params;

        const country = await Country.findByPk(idPais, {
            include: Activity
        });

        if (!country) throw Error('Country not found.');
        return res.status(200).json(country);


    } catch (error) {
        return res.status(404).send(error.message)
    }

}

module.exports = {
    getCountryById,
};