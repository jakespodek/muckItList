// Form.js
import { useState } from 'react';
import firebase from '../config/firebase';

const Form = () => {

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantCity, setRestaurantCity] = useState('');
    
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

    return (
        <form action="submit" >
            <label htmlFor="restaurantName" className="sr-only">
                Add a restaurant to your list
            </label>
            <input
                type="text"
                id="restaurantName"
                value={restaurantName}
                onChange={(event) => setRestaurantName(event.target.value)}
                minLength="0"
                maxLength="30"
                placeholder="restaurant name"
            />
            <label htmlFor="restaurantCity" className="sr-only">
                Specify the city, town, or area that the restaurant is in
            </label>
            <input
                type="text"
                id="restaurantCity"
                value={restaurantCity}
                onChange={(event) => setRestaurantCity(event.target.value)}
                minLength="0"
                maxLength="30"
                placeholder="restaurant location (e.g. toronto)"
            />
            <button onClick={handleRestaurantAdd}>Add Restaurant</button>
        </form>
    )
}

export default Form;