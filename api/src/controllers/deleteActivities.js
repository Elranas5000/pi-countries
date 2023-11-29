const { Activity } = require('../db');



const deleteActivity = async (req, res) => { //maneja la solicitud para borrar una actividad determinada de la DB
  try {
    const { id } = req.params; //extraigo la id isando parametros de la solicitud

    const activity = await Activity.findByPk(id); //por clave primaria busco esa actividad
    if (!activity) { //si no existe, envio un mensaje de error
      return res.status(404).json({ error: 'Activity not found' });
    }

    await Activity.destroy({ where: { id } }); //si existe, la destruyo y envio un mensaje de exito

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = deleteActivity;
