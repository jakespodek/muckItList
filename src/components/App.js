import { useEffect, useState } from 'react';
import '../styles/App.css';
import firebase from '../config/firebase';
import RestaurantContainer from './RestaurantContainer.js'

function App() {

  const [ restaurants, setRestaurants ] = useState([]);
  // const [ userInput, setUserInput ] = useState('');

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

    // dbRef.push(newRestaurant);

    // setRestaurantName('');
    // setRestaurantCity('');

    // inputValue.length && inputValue.length < 50 ? setUserInput(inputValue) : alert('Please try a shorter restaurant name');

    restaurantName.length && restaurantCity.length
      ? dbRef.push(newRestaurant)
      : alert('Please include both the restaurant name and the city or town it is located in');

    setRestaurantName('');
    setRestaurantCity('');
    
  }

  const handleRestaurantDelete = (restaurant) => {
    const dbRef = firebase.database().ref();

    dbRef.child(restaurant.key).remove();

    console.log(restaurant.name, 'removed!');
  }

  return (
    <div className="wrapper">
      <h1>Muck-it List</h1>
      <h2>Make a list of restaurants you would like to go to</h2>
      {/* <h2>Muck Definition</h2> */}
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
          minlength="0"
          maxlength="50"
        />
        <label htmlFor="restaurantCity" className="sr-only">
          Specify the city, town, or area that the restaurant is in
        </label>
        <input
          type="text"
          id="restaurantCity"
          value={restaurantCity}
          onChange={ (event) => setRestaurantCity(event.target.value) }
          minlength="0"
          maxlength="50"
        />
        <button onClick={handleRestaurantAdd}>Add Restaurant</button>
      </form>
    </div>
  );
};

export default App;
