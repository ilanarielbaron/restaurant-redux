import { createSupabaseClient } from "./apiUtils";

export function getAllMeals() {
  const supabase = createSupabaseClient()
  return supabase
    .from('meal')
    .select('*')
}

export function createMeal(meal, selectedRestaurant) {
  const supabase = createSupabaseClient()
  return supabase
    .from('meal')
    .insert([
      { name: meal.name , description: meal.description , price: parseFloat(meal.price), restaurantId: selectedRestaurant}
    ])
}

export function editMeal(meal, id, selectedRestaurant) {
  const supabase = createSupabaseClient()
  return supabase
    .from('meal')
    .update({...meal, restaurantId: selectedRestaurant})
    .eq('id', id)
}

export function removeMeal(id) {
  const supabase = createSupabaseClient()
  return supabase
    .from('meal')
    .delete()
    .eq('id', id)
}
