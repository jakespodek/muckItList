import { useEffect, useState } from 'react';
import '../styles/App.css';
import firebase from '../config/firebase';
import RestaurantContainer from './RestaurantContainer.js'
import MuckDefinition from './MuckDefinition.js';
import Form from './Form.js';

function App() {

  const [ restaurants, setRestaurants ] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {
      const newDataArray = []
      const data = response.val();

      for (let key in data) {
        newDataArray.push({ key: key, name: data[key].name, city: data[key].city });
      }

      setRestaurants(newDataArray);
    });

  }, []); // <------ dependancy array

  const handleRestaurantDelete = (restaurant) => {
    const dbRef = firebase.database().ref();
    dbRef.child(restaurant.key).remove();
  };

  return (
    <div className="wrapper">
      <h1>Muck-it List</h1>
      <h2>for the restaurants you want to check out before you check out</h2>
      <MuckDefinition />
      <RestaurantContainer restaurantList={restaurants} deleteRestaurant={handleRestaurantDelete} />
      <Form />
    </div>
  );
};

export default App;
