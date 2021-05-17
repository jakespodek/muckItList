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

  return (
    <div>
      <h1>Muck-it List</h1>
      <h2>Muck Definition</h2>
      <RestaurantContainer restaurantList={restaurants}/>
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
        <button onClick={handleSubmitClick}>Add Restaurant</button>
      </form>
    </div>
  );
};

export default App;
