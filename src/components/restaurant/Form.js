import React, {useEffect, useState} from "react";
import TextInput from "../common/TextInput";
import {useRestaurant} from "../../hooks/useRestaurant/useRestaurant"
import PropTypes from "prop-types"
import {toast} from "react-toastify"

export const RestaurantForm = ({ restaurant = {} }) => {
  const [newRestaurant, setNewRestaurant] = useState({name: restaurant.name, description: restaurant.description});
  const [errors, setErrors] = useState({});
  const { loading, error, createRestaurant, editRestaurant } = useRestaurant()

  function formIsValid() {
    const { name, description } = newRestaurant;
    const errors = {};

    if (!name) errors.name = "Name is required.";
    if (!description) errors.description = "Description is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    if(restaurant.id) {
      editRestaurant({restaurant: newRestaurant, id: restaurant.id})
    } else {
      createRestaurant({restaurant: newRestaurant})
    }
    setNewRestaurant({})
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewRestaurant(prevRestaurant => ({
      ...prevRestaurant,
      [name]: value
    }));
  }

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  return (
    <div style={{marginTop: 20}} className='card card-body'>
      <h2>{restaurant.id ? 'Edit' : 'Create'} Restaurant</h2>
      <form onSubmit={handleSave}>
        <TextInput
          name="name"
          label="Name"
          value={newRestaurant.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextInput
          name="description"
          label="Description"
          value={newRestaurant.description}
          onChange={handleChange}
          error={errors.description}
        />

        <div>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Loading..." : !restaurant.id ? "Create" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  )
}

RestaurantForm.propTypes = {
  restaurant: PropTypes.object
}

