import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActivity } from '../../Redux/actions/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Delete = () => {
  const dispatch = useDispatch();
  const [selectedActivity, setSelectedActivity] = useState('');
  const [activities, setActivities] = useState([]);

  // Lógica para obtener las actividades desde la API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/activities'); // Reemplaza la URL con tu endpoint real
        const activitiesData = response.data;
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error.message);
      }
    };

    
    fetchActivities();
  }, []); 

  const handleDeleteClick = () => {
 
    if (selectedActivity) {
    
      dispatch(deleteActivity(selectedActivity));

      // Limpiar la selección después de la eliminación
      setSelectedActivity('');
    }
  };

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>

      <label>Select an activity to delete:</label>
      <select onChange={(e) => setSelectedActivity(e.target.value)} value={selectedActivity}>
        <option value="">Select an activity</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteClick} disabled={!selectedActivity}>
        Delete
      </button>
    </div>
  );
};

export default Delete;
