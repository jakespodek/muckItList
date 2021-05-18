// RestaurantContainer.js
import googleMapsIcon from '../assets/googleMapsIcon.png';

const RestaurantContainer = ({ restaurantList, deleteRestaurant }) => {

    const urlPrefix = 'https://www.google.com/maps/search/?api=1&query='

    return (
        <ul className="restaurantContainer">
            {
                restaurantList.map((restaurant) => {
                    return (
                        // add key!!!
                        <li className="restaurant" key={restaurant.key}>
                            <p>Restaurant: {restaurant.name}</p>
                            <button onClick={() => deleteRestaurant(restaurant)}>Remove from list x</button>
                            <a href={urlPrefix + restaurant.name} target="_blank" rel="noopener noreferrer" >
                                <img src={googleMapsIcon} alt="Google Maps Icon" />
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default RestaurantContainer;