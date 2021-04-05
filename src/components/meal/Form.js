import React, {useEffect, useState} from "react";
import TextInput from "../common/TextInput";
import { useMeal } from "../../hooks/useMeal/useMeal"
import PropTypes from "prop-types"
import {useRestaurant} from "../../hooks/useRestaurant/useRestaurant"
import SelectInput from "../common/SelectInput"

export const MealForm = (meal = {}) => {
  const [newMeal, setNewMeal] = useState({name: meal?.meal?.name, description: meal?.meal?.description, price: meal?.meal?.price});
  const [errors, setErrors] = useState({});
  const [selectedRestaurant, setSelectedRestaurant] = useState(meal?.meal?.restaurantId);
  const { loading, error, createMeal, editMeal } = useMeal()
  const { restaurants, fetchRestaurants } = useRestaurant()

  const restaurantFormatted = restaurants?.length > 0 ? restaurants?.map((restaurant) => {
    return {text: restaurant.name, value: restaurant.id}
  }) : []

  useEffect(() => {
    fetchRestaurants()
  }, [])

  function formIsValid() {
    const { name, description, price } = newMeal;
    const errors = {};

    if (!name) errors.name = "Name is required.";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    if(meal?.meal?.id) {
      editMeal(newMeal, meal.meal.id, selectedRestaurant)
    } else {
      createMeal(newMeal, selectedRestaurant)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewMeal(prevMeal => ({
      ...prevMeal,
      [name]: value
    }));
  }

  function handleOptionChange(event) {
    setSelectedRestaurant(event.target.value)
  }

  return (
    <div>
      <h2>{meal?.meal?.id ? 'Edit' : 'Create'} Meal</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSave}>
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
        <SelectInput onChange={handleOptionChange} label='Restaurant' name='restaurantId' value={selectedRestaurant} error={errors.restaurant} options={restaurantFormatted} />
        <div>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Loading..." : !meal?.meal?.id ? "Create" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  )
}

MealForm.propTypes = {
  meal: PropTypes.object
};
