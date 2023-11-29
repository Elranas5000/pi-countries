const { Activity } = require("../db");

const getActivities = async (req, res) => { //obtiene las actividades de la DB
    try {
        const activities = await Activity.findAll({ //findAll para obtener todas las instancias del modelo activities
            include: ['countries'], //incluyo countries asociados a cada activity, es decir que las actividades se llaman con los paises
        });

        return res.status(200).json(activities);
    } catch (error) {
        console.error("Error al obtener actividades:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

module.exports = {
    getActivities,
};

