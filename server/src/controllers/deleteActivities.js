const { Activity } = require('../db');



const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    await Activity.destroy({ where: { id } });

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = deleteActivity;
