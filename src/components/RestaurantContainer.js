// RestaurantContainer.js
const RestaurantContainer = ({ restaurantList, deleteRestaurant }) => {
    return (
        <ul className="restaurantContainer">
            {
                restaurantList.map((restaurant) => {
                    return (
                        // add key!!!
                        <li className="restaurant" key={restaurant.key}>
                            <p>Restaurant: {restaurant.name}</p>
                            <button onClick={() => deleteRestaurant(restaurant)}>Remove from list x</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default RestaurantContainer;