import React, {useEffect, useState} from "react"
import {useMeal} from "../../hooks/useMeal/useMeal"
import {MealForm} from "./Form"
import {useUser} from "../../hooks/useUser/useUser"
import {useOrder} from "../../hooks/useOrder/useOrder"

export const Meal = (restaurant) => {
  const {fetchMeals, meals, removeMeal} = useMeal()
  const [createMealOpen, setCreateMealOpen] = useState(false)
  const [mealToEdit, setMealToEdit] = useState()
  const [mealsToDisplay, setMealsToDisplay] = useState(meals)
  const [mealsSelected, setMealsSelected] = useState([])
  const {isOwner, isUserLogged, getUser} = useUser()
  const {createOrder, success} = useOrder()
  const canPlaceOrder = isUserLogged && restaurant && !isOwner

  useEffect(() => {
    fetchMeals()
  }, [])

  useEffect(() => {
    setMealsToDisplay(restaurant?.restaurant?.id ? meals.filter(meal => meal.restaurantId === restaurant?.restaurant?.id) : meals)
  }, [restaurant, meals])

  const handleSelectMeal = (meal) => {
    if (mealToEdit === meal) {
      setMealToEdit(undefined)
    } else {
      setMealToEdit(meal)
    }
  }

  const handleAddMealToOrder = (meal) => {
    setMealsSelected([...mealsSelected, meal])
  }

  const handleRemoveMealFromOrder = (meal) => {
    setMealsSelected(mealsSelected.filter(mealSelected => mealSelected.id !== meal.id))
  }

  const handlePlaceOrder = () => {
    const orderTotal = getOrderTotal()
    const order = {total: orderTotal, restaurantId: restaurant?.restaurant?.id, userId: getUser().id}
    createOrder(order, mealsSelected)
  }

  const getOrderTotal = () => {
    let total = 0
    mealsSelected.forEach(meal => total += parseFloat(meal.price))
    return total
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
                removeMeal(meal.id)
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
      {isOwner && <button onClick={() => setCreateMealOpen(!createMealOpen)}>Create Meal</button>}
      {canPlaceOrder &&
      <div>
        <button disabled={mealsSelected.length === 0} onClick={handlePlaceOrder}>Place Order</button>
        <p>{`Order Total: $${getOrderTotal()}`}</p>
      </div>}
      {createMealOpen && <MealForm/>}
      {mealToEdit && <MealForm meal={mealToEdit}/>}
    </div>
  )
}
