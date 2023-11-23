import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../../Redux/actions/actions'; //importo la acción para borrar la actividad
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "../Delete/Delete.module.css"

const Delete = () => {

  const dispatch = useDispatch();

  const [selectedActivity, setSelectedActivity] = useState(''); //almacena la actividad seleccionada
  const [activities, setActivities] = useState([]);//almacena las actividades traidas del server
  const [deleteSuccess, setDeleteSuccess] = useState(false); //estado para manejar si la eliminacion tuvo exito

  //useEffect para realizar la peticion GET
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

  //funcion para manejar el botón delete
  const handleDeleteClick = async () => {
    try {
      
      if (selectedActivity) { //si hay una actividad seleccionada:

        //despacha la accion para borrar la actividad
        await dispatch(deleteActivity(selectedActivity));

        //limpia el estado
        setSelectedActivity('');
        
        // muestra el mensaje de exito
        setDeleteSuccess(true);

        //luego de 3 segundos, lo deja de mostrar
        setTimeout(() => {
          setDeleteSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting activity:', error.message);
    }
  };

  return (
    <div className={styles.container}>

      <Link to="/home">
        <button>Home</button>
      </Link>

      <div className={styles.select}>
        {/* <label>Select an activity to delete:</label> */}
        <select onChange={(e) => setSelectedActivity(e.target.value)} value={selectedActivity}>
          <option value="">Select an activity to delete</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.button}>
        <button onClick={handleDeleteClick} disabled={!selectedActivity}>
          Delete
        </button>
      </div>
      
      {deleteSuccess && (
        <p style={{ color: 'green' }}>Activity deleted successfully!</p>
      )}
    </div>
  );
};

export default Delete;
