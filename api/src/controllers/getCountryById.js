const { Country, Activity } = require('../db');

const getCountryById = async (req, res) => {
    try {
        const {idPais} = req.params; //extraigo la id desde los parametros de la solicitud

        const country = await Country.findByPk(idPais, { //busco por clave primaria al pais y su id
            include: Activity
        });

        if (!country) throw Error('Country not found.'); //si no lo encuentra, error
        return res.status(200).json(country);


    } catch (error) {
        return res.status(404).send(error.message)
    }

}

module.exports = {
    getCountryById,
};