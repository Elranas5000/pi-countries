const { Country } = require("../db");
const { Op } = require("sequelize"); //para usar el operador Op.iLike

const getCountriesByName = async (req, res) => {
  const { name } = req.query; // obtengo el parametro name de la consulta de la solicitud, el nombre del pais

  try {
    
    console.log(`searching for countries with name: ${name}`);

    const countriesFromDB = await Country.findAll({ //busco todos aquellos paises cuyo:
      where: {
        name: {
          [Op.iLike]: `%${name}%`, //para encontrar un simil sin distincion entre mayus y minus
        },
      },
    });

    console.log(`countries found in the database:`, countriesFromDB);

    if (countriesFromDB.length === 0) {
        console.log(`no country found in the database`);
      return res.status(404).json({ message: "No country found" });
    }

    console.log(`sending response with countries from the database`);

    return res.status(200).json(countriesFromDB);
  } catch (error) {
    console.log(`error finding countries by name:`, error.message);
    return res.status(500).json({ message: "Error finding countries by name", error: error.message });
  }
};

module.exports = getCountriesByName;
