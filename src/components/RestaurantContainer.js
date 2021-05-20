// RestaurantContainer.js
import googleMaps from '../assets/googleMaps.svg.png';

const RestaurantContainer = ({ restaurantList, deleteRestaurant }) => {

    const urlPrefix = 'https://www.google.com/maps/search/?api=1&query='

    return (
        <ul>
            {
                restaurantList.map((restaurant) => {
                    return (
                        <li key={restaurant.key}>
                            <button onClick={() => deleteRestaurant(restaurant)}>𝗫</button>

                            <div className="liText">
                                <p>{restaurant.name}</p>
                                <p>{restaurant.city}</p>
                            </div>
                            
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