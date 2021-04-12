import React, {useEffect, useState} from "react"
import {useMeal} from "../../hooks/useMeal/useMeal"
import {MealForm} from "./Form"
import {useUser} from "../../hooks/useUser/useUser"
import {useOrder} from "../../hooks/useOrder/useOrder"
import PropTypes from "prop-types"
import {toast} from "react-toastify"

export const Meal = ({restaurant}) => {
  const {fetchMeals, meals, removeMeal, editMeal, createMeal, error} = useMeal()
  const [createMealOpen, setCreateMealOpen] = useState(false)
  const [mealToEdit, setMealToEdit] = useState()
  const [mealsToDisplay, setMealsToDisplay] = useState(meals)
  const [mealsSelected, setMealsSelected] = useState([])
  const {isOwner, isUserLogged, getUser} = useUser()
  const {createOrder, success: orderSuccess} = useOrder()
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
    createOrder({order, meals: mealsSelected})
  }

  const getOrderTotal = () => {
    let total = 0
    mealsSelected.forEach(meal => total += parseFloat(meal.price))
    return total
  }

  const handleSave = (newMeal, selectedRestaurant) => {
    if (!formIsValid(newMeal)) return;
    if (mealToEdit?.id) {
      editMeal({meal: newMeal, id: mealToEdit.id, selectedRestaurant})
    } else {
      createMeal({meal: newMeal, selectedRestaurant})
    }
  }

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  useEffect(() => {
    orderSuccess && toast.success('Order created')
    setMealsSelected([])
  }, [orderSuccess])

  const formIsValid = (newMeal) => {
    const {name, description, price} = newMeal;
    const errors = {};

    if (!name) errors.name = "Name is required.";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <div>
          <h2 className='card-title'>Meals</h2>
          <table className='table'>
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {mealsToDisplay.map((meal, index) => {
              return (
                <tr key={meal.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{meal.name}</td>
                  <td>
                    {isOwner &&
                    <div className="btn-group" role="group">
                      <button className='btn btn-secondary' onClick={() => {
                        handleSelectMeal(meal)
                      }}>Edit
                      </button>
                      <button className='btn btn-danger' onClick={() => {
                        removeMeal({id: meal.id})
                      }}>Remove
                      </button>
                    </div>}
                    {canPlaceOrder && !mealsSelected.includes(meal) &&
                    <button className='btn btn-secondary' onClick={() => {
                      handleAddMealToOrder(meal)
                    }}>Add to order</button>}
                    {canPlaceOrder && mealsSelected.includes(meal) &&
                    <button className='btn btn-secondary' onClick={() => {
                      handleRemoveMealFromOrder(meal)
                    }}>Remove from order</button>}
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
          {isOwner && <button className='btn btn-secondary' onClick={() => {
            setCreateMealOpen(true)
            setMealToEdit(undefined)
          }}>Create Meal</button>}
          {canPlaceOrder &&
          <div>
            <button className='btn btn-secondary' disabled={mealsSelected.length === 0} onClick={handlePlaceOrder}>Place Order</button>
            <p>{`Order Total: $${getOrderTotal()}`}</p>
          </div>}
          {createMealOpen && isUserLogged && <MealForm handleSave={handleSave} errors={errors}/>}
          {mealToEdit && isUserLogged && <MealForm meal={mealToEdit} handleSave={handleSave} errors={errors}/>}
        </div>
      </div>
    </div>
  )
}

Meal.propTypes = {
  restaurant: PropTypes.object
};
