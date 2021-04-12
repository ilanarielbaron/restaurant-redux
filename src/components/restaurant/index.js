import React, {useEffect, useState} from "react"
import {RestaurantForm} from "./Form"
import {useRestaurant} from "../../hooks/useRestaurant/useRestaurant"
import {Meal} from "../meal"
import {useUser} from "../../hooks/useUser/useUser"
import {toast} from "react-toastify"

export const Restaurant = () => {
  const {fetchRestaurants, removeRestaurant, restaurants, error, success} = useRestaurant()
  const [createRestaurantOpen, setCreateRestaurantOpen] = useState(false)
  const [restaurantToEdit, setRestaurantToEdit] = useState()
  const [restaurantSelected, setRestaurantSelected] = useState()
  const {isOwner, isUserLogged} = useUser()

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  useEffect(() => {
    success && toast.success(success)
  }, [success])

  const handleSelectRestaurant = (restaurant) => {
    setCreateRestaurantOpen(false)
    setRestaurantToEdit(restaurant)
  }

  if (restaurantSelected) {
    return (
      <div>
        <h2>Restaurant {restaurantSelected.name}</h2>
        <button style={{marginBottom: 20}} className='btn badge-dark' onClick={() => setRestaurantSelected(undefined)}>Back</button>
        <Meal restaurant={restaurantSelected}/>
      </div>
    )
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='card-title'>Restaurants</h2>
        <table className='table'>
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          {restaurants.map((restaurant, index) => {
            return (
              <tr key={restaurant.id}>
                <th scope="row">{index + 1}</th>
                <td>{restaurant.name}</td>
                <td>
                  <div className="btn-group" role="group">
                    {isOwner && <button className='btn btn-secondary' onClick={() => {
                      handleSelectRestaurant(restaurant)
                    }}>Edit</button>}
                    {isOwner && <button className='btn btn-secondary' onClick={() => {
                      removeRestaurant({id: restaurant.id})
                    }}>Remove</button>}
                    <button className='btn btn-danger' onClick={() => {
                      setRestaurantSelected(restaurant)
                    }}>Show Meals
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>

        {isOwner && <button className='btn btn-secondary' onClick={() => {
          setCreateRestaurantOpen(!createRestaurantOpen)
          setRestaurantToEdit(undefined)
        }}>Create Restaurant</button>}

        {createRestaurantOpen && isUserLogged && <RestaurantForm/>}
        {restaurantToEdit && isUserLogged && <RestaurantForm restaurant={restaurantToEdit}/>}
      </div>
    </div>
  )
}
