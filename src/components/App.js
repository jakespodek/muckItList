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
    <div className="appComponent wrapper">
      <header>
        <h1>Muck-it List</h1>
        <MuckDefinition />
      </header>
      <main>
        <Form />
        <RestaurantContainer restaurantList={restaurants} deleteRestaurant={handleRestaurantDelete} />
      </main>
      <footer>
        <h2>For the restaurants you need to check out before checking out</h2>
        <p>Created by <a href="https://jakespodek.com/" target="_blank" rel="noopener noreferrer">Jake Spodek</a> at <a href="https://junocollege.com/" target="_blank" rel="noopener noreferrer">Juno College</a></p>
      </footer>
    </div>
  );
};

export default App;
