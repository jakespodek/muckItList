import { useEffect, useState } from 'react';
import '../styles/App.css';
import firebase from '../config/firebase';
import RestaurantContainer from './RestaurantContainer.js'

function App() {

  const [ restaurants, setRestaurants ] = useState([]);
  const [ userInput, setUserInput ] = useState('');

  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {
      const newDataArray = []
      const data = response.val();

      for (let key in data) {
        newDataArray.push({ key: key, name: data[key] });
      }

      setRestaurants(newDataArray);

    });

  }, []); // <------ dependancy array

  const handleUserInput = (event) => {
    let inputValue = event.target.value;
    setUserInput(inputValue);
  };

  const handleRestaurantAdd = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();
    
    dbRef.push(userInput);

    console.log('restaurant added!');

    setUserInput('');
  }

  const handleRestaurantDelete = (restaurant) => {
    const dbRef = firebase.database().ref();

    dbRef.child(restaurant.key).remove();

    console.log(restaurant.name, 'removed!');
  }

  return (
    <div>
      <h1>Muck-it List</h1>
      <h2>Muck Definition</h2>
      <RestaurantContainer restaurantList={restaurants} deleteRestaurant={handleRestaurantDelete} />
      <form action="submit">
        <label htmlFor="input" className="sr-only">
          Add a restaurant to your list
        </label>
        <input 
          type="text"
          id="input"
          value={userInput}
          onChange={handleUserInput} 
        />
        <button onClick={handleRestaurantAdd}>Add Restaurant</button>
      </form>
    </div>
  );
};

export default App;
