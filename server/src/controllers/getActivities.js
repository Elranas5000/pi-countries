const { Activity } = require("../db");

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: ['countries'],
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

