// RestaurantContainer.js
import googleMaps from '../assets/googleMaps.svg.png';

const RestaurantContainer = ({ restaurantList, deleteRestaurant }) => {

    const urlPrefix = 'https://www.google.com/maps/search/?api=1&query='

    return (
        <ul className="restaurantContainer">
            {
                restaurantList.map((restaurant) => {
                    return (
                        <li className="restaurant" key={restaurant.key}>
                            <p>Restaurant: {restaurant.name}</p>
                            <p>{restaurant.city}</p>

                            <button onClick={() => deleteRestaurant(restaurant)}>Remove from list x</button>
                            
                            <a href={urlPrefix + restaurant.name + '%2C%20' + restaurant.city} target="_blank" rel="noopener noreferrer" >
                                <img src={googleMaps} alt="Google Maps Icon" />
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default RestaurantContainer;