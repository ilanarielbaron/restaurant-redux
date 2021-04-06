import React, {useEffect, useState} from "react";
import TextInput from "../common/TextInput";
import { useMeal } from "../../hooks/useMeal/useMeal"
import PropTypes from "prop-types"
import {useRestaurant} from "../../hooks/useRestaurant/useRestaurant"
import SelectInput from "../common/SelectInput"

export const MealForm = ({ meal = {}, handleSave, errors }) => {
  const [newMeal, setNewMeal] = useState({ name: meal.name, description: meal.description, price: meal.price });
  const { loading, error } = useMeal()
  const { restaurants, fetchRestaurants } = useRestaurant()
  const [selectedRestaurant, setSelectedRestaurant] = useState(meal.restaurantId);

  const restaurantFormatted = restaurants?.length > 0 ? restaurants?.map((restaurant) => {
    return { text: restaurant.name, value: restaurant.id }
  }) : []

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMeal(prevMeal => ({
      ...prevMeal,
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSave(newMeal)
  }

  const handleRestaurantOptionChange = (event) => {
    setSelectedRestaurant(event.target.value)
  }

  return (
    <div>
      <h2>{meal.id ? 'Edit' : 'Create'} Meal</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextInput
          name="name"
          label="Name"
          value={newMeal.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextInput
          name="description"
          label="Description"
          value={newMeal.description}
          onChange={handleChange}
          error={errors.description}
        />

        <TextInput
          name="price"
          label="Price"
          value={newMeal.price}
          onChange={handleChange}
          error={errors.price}
        />
        <SelectInput onChange={handleRestaurantOptionChange} label='Restaurant' name='restaurantId' value={selectedRestaurant} error={errors.restaurant} options={restaurantFormatted} />
        <div>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Loading..." : !meal.id ? "Create" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  )
}

MealForm.propTypes = {
  meal: PropTypes.object,
  errors: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired
};
