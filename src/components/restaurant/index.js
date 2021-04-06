import React, { useEffect, useState } from "react"
import { RestaurantForm } from "./Form"
import { useRestaurant } from "../../hooks/useRestaurant/useRestaurant"
import { Meal } from "../meal"
import { useUser } from "../../hooks/useUser/useUser"

export const Restaurant = () => {
  const { fetchRestaurants, removeRestaurant, restaurants } = useRestaurant()
  const [createRestaurantOpen, setCreateRestaurantOpen] = useState(false)
  const [restaurantToEdit, setRestaurantToEdit] = useState()
  const [restaurantSelected, setRestaurantSelected] = useState()
  const { isOwner } = useUser()

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const handleSelectRestaurant = (restaurant) => {
    setCreateRestaurantOpen(undefined)
    setRestaurantToEdit(restaurant)
  }

  if (restaurantSelected) {
    return (
      <div>
        <h2>Restaurant {restaurantSelected.name}</h2>
        <button onClick={() => setRestaurantSelected(undefined)}>Back</button>
        <Meal restaurant={restaurantSelected}/>
      </div>
    )
  }

  return (
    <div>
      <h1>Restaurants</h1>
      {restaurants.map((restaurant) => {
        return (
          <div key={restaurant.id}>
            {restaurant.name}
            {isOwner && <button onClick={() => {handleSelectRestaurant(restaurant)}}>Edit</button>}
            {isOwner && <button onClick={() => {removeRestaurant({id: restaurant.id})}}>Remove</button>}
            <button onClick={() => {setRestaurantSelected(restaurant)}}>Show Meals</button>
          </div>
        )
      })}

      {isOwner && <button onClick={() => {
        setCreateRestaurantOpen(!createRestaurantOpen)
        setRestaurantToEdit(undefined)
      }}>Create Restaurant</button>}

      {createRestaurantOpen && <RestaurantForm />}
      {restaurantToEdit && <RestaurantForm restaurant={restaurantToEdit}/>}
    </div>
  )
}
