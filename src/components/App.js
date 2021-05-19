import { useEffect, useState } from 'react';
import '../styles/App.css';
import firebase from '../config/firebase';
import RestaurantContainer from './RestaurantContainer.js'
import MuckDefinition from './MuckDefinition.js';

function App() {

  const [ restaurants, setRestaurants ] = useState([]);
  const [ restaurantName, setRestaurantName ] = useState('');
  const [ restaurantCity, setRestaurantCity ] = useState('');

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

  const handleRestaurantAdd = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();

    const newRestaurant = {
      name: restaurantName,
      city: restaurantCity
    }

    const clearInputs = () => {
      dbRef.push(newRestaurant);
      setRestaurantName('');
      setRestaurantCity('');
    };

    restaurantName.length && restaurantCity.length
      ? clearInputs()
      : alert('Please include both the restaurant name and the city or town it is located in');
  };

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
      <form action="submit">
        <label htmlFor="restaurantName" className="sr-only">
          Add a restaurant to your list
        </label>
        <input 
          type="text"
          id="restaurantName"
          value={restaurantName}
          onChange={ (event) => setRestaurantName(event.target.value) }
          minLength="0"
          maxLength="50"
          placeholder="name of restaurant"
        />
        <label htmlFor="restaurantCity" className="sr-only">
          Specify the city, town, or area that the restaurant is in
        </label>
        <input
          type="text"
          id="restaurantCity"
          value={restaurantCity}
          onChange={ (event) => setRestaurantCity(event.target.value) }
          minLength="0"
          maxLength="50"
          placeholder="location of restaurant (e.g. toronto)"
        />
        <button onClick={handleRestaurantAdd}>Add Restaurant</button>
      </form>
    </div>
  );
};

export default App;
