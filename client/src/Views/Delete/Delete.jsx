import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../../Redux/actions/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Delete = () => {
  const dispatch = useDispatch();
  const [selectedActivity, setSelectedActivity] = useState('');
  const [activities, setActivities] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/activities'); 
        const activitiesData = response.data;
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error.message);
      }
    };

    fetchActivities();
  }, []);

  const handleDeleteClick = async () => {
    try {
      if (selectedActivity) {

        await dispatch(deleteActivity(selectedActivity));

        setSelectedActivity('');
        
        // Mostrar el mensaje de éxito
        setDeleteSuccess(true);

        setTimeout(() => {
          setDeleteSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting activity:', error.message);
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

      {deleteSuccess && (
        <p style={{ color: 'green' }}>Activity deleted successfully!</p>
      )}
    </div>
  );
};

export default Delete;
