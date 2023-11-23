const { Activity } = require("../db");

const postActivity = async (req, res) => {
    try {
        const { name, difficulty, season, countries } = req.body; //desestructiring de los datos que necesito del cuerpo de la solicitud

        console.log("Datos recibidos:", req.body);
        console.log("Tipo de dato de countries:", typeof countries);

        if (!name || !difficulty || !season || !countries || !countries.length) { //verificacion de los datos para asegurarse de que no faltan campos
            throw new Error("Datos incompletos");
        }

        const newActivity = await Activity.create({ //Creo la actividad
            name,
            difficulty,
            season: [season],
        });

        await newActivity.addCountries(countries); //Añado los paises a esa actividad creada mediante addCountries

        return res.status(200).json(newActivity);
    } catch (error) {//manejo errores
        console.error("Error en la solicitud:", error);
        return res.status(500).json({ error: "Datos incompletos", details: error.message });
    }
};

module.exports = {
    postActivity,
};
