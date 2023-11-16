const { Activity, Country } = require("../db");

const postActivity = async (req, res) => {
    try {
        const { name, difficulty, season, countries } = req.body;

        console.log("Datos recibidos:", req.body);
        console.log("Tipo de dato de countries:", typeof countries);

        if (!name || !difficulty || !season || !countries || !countries.length) {
            throw new Error("Datos incompletos");
        }

        const newActivity = await Activity.create({
            name,
            difficulty,
            season: [season],
        });

        await newActivity.addCountries(countries);

        return res.status(200).json(newActivity);
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return res.status(500).json({ error: "Datos incompletos", details: error.message });
    }
};

module.exports = {
    postActivity,
};
