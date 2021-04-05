import { createSupabaseClient } from "./apiUtils";

export function getAllRestaurants() {
  const supabase = createSupabaseClient()
  return supabase
    .from('restaurant')
    .select('*')
}

export function createRestaurant(restaurant) {
  const supabase = createSupabaseClient()
  return supabase
    .from('restaurant')
    .insert([
      { name: restaurant.name , description: restaurant.description }
    ])
}

export function editRestaurant(restaurant, id) {
  const supabase = createSupabaseClient()
  return supabase
    .from('restaurant')
    .update({...restaurant})
    .eq('id', id)
}

export function removeRestaurant(id) {
  const supabase = createSupabaseClient()
  return supabase
    .from('restaurant')
    .delete()
    .eq('id', id)
}
