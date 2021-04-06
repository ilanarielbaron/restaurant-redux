import React, { useEffect, useState } from "react"
import { useMeal } from "../../hooks/useMeal/useMeal"
import { MealForm } from "./Form"
import { useUser } from "../../hooks/useUser/useUser"
import { useOrder } from "../../hooks/useOrder/useOrder"
import PropTypes from "prop-types"

export const Meal = ({ restaurant }) => {
  const { fetchMeals, meals, removeMeal, editMeal, createMeal } = useMeal()
  const [createMealOpen, setCreateMealOpen] = useState(false)
  const [mealToEdit, setMealToEdit] = useState()
  const [mealsToDisplay, setMealsToDisplay] = useState(meals)
  const [mealsSelected, setMealsSelected] = useState([])
  const { isOwner, isUserLogged, getUser } = useUser()
  const { createOrder, success } = useOrder()
  const canPlaceOrder = isUserLogged && restaurant && !isOwner
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchMeals()
  }, [])

  useEffect(() => {
    setMealsToDisplay(restaurant?.id ? meals.filter(meal => meal.restaurantId === restaurant?.id) : meals)
  }, [restaurant, meals])

  const handleSelectMeal = (meal) => {
    setMealToEdit(meal)
    setCreateMealOpen(false)
  }

  const handleAddMealToOrder = (meal) => {
    setMealsSelected([...mealsSelected, meal])
  }

  const handleRemoveMealFromOrder = (meal) => {
    setMealsSelected(mealsSelected.filter(mealSelected => mealSelected.id !== meal.id))
  }

  const handlePlaceOrder = () => {
    const orderTotal = getOrderTotal()
    const order = {total: orderTotal, restaurantId: restaurant?.id, userId: getUser().id}
    createOrder({order, mealsSelected})
  }

  const getOrderTotal = () => {
    let total = 0
    mealsSelected.forEach(meal => total += parseFloat(meal.price))
    return total
  }

  const handleSave = (newMeal, selectedRestaurant) => {
    if (!formIsValid(newMeal)) return;
    if(mealToEdit?.id) {
      editMeal({newMeal, id: mealToEdit.id, selectedRestaurant})
    } else {
      createMeal({newMeal, selectedRestaurant})
    }
  }

  const formIsValid = (newMeal) => {
    const { name, description, price } = newMeal;
    const errors = {};

    if (!name) errors.name = "Name is required.";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <div>
      <h2>Meals</h2>
      {success && <p>Order created successful</p>}
      {mealsToDisplay.map((meal) => {
        return (
          <div key={meal.id}>
            {meal.name}
            {isOwner &&
            <div>
              <button onClick={() => {
                handleSelectMeal(meal)
              }}>Edit
              </button>
              <button onClick={() => {
                removeMeal({id: meal.id})
              }}>Remove
              </button>
            </div>}
            {canPlaceOrder && !mealsSelected.includes(meal) && <button onClick={() => {
              handleAddMealToOrder(meal)
            }}>Add to order</button>}
            {canPlaceOrder && mealsSelected.includes(meal) && <button onClick={() => {
              handleRemoveMealFromOrder(meal)
            }}>Remove from order</button>}
          </div>
        )
      })}
      {isOwner && <button onClick={() => {
        setCreateMealOpen(true)
        setMealToEdit(undefined)
      }}>Create Meal</button>}
      {canPlaceOrder &&
      <div>
        <button disabled={mealsSelected.length === 0} onClick={handlePlaceOrder}>Place Order</button>
        <p>{`Order Total: $${getOrderTotal()}`}</p>
      </div>}
      {createMealOpen && <MealForm handleSave={handleSave} errors={errors}/>}
      {mealToEdit && <MealForm meal={mealToEdit} handleSave={handleSave} errors={errors} />}
    </div>
  )
}

Meal.propTypes = {
  restaurant: PropTypes.object
};
