import { createSupabaseClient } from "./apiUtils";

export function getAllOrdersForUser(userId) {
  const supabase = createSupabaseClient()
  return supabase
    .from('orders')
    .select('*, meal(id, name), statusHistory(id, from, to, date)')
    .eq(userId ? 'userId' : '', userId ?? '')
}

export function createOrder(order) {
  const supabase = createSupabaseClient()
  return supabase
    .from('orders')
    .insert([
      {total: order.total, status: 'Placed', restaurantId: order.restaurantId, userId: order.userId}
    ])
}

export function createMealOrder(idOrder, idMeal) {
  const supabase = createSupabaseClient()
  return  supabase
    .from('mealsOrders')
    .insert([
      { idOrder: idOrder, idMeal: idMeal },
    ])
}

export function updateOrderStatus(status, id) {
  const supabase = createSupabaseClient()
  return supabase
    .from('orders')
    .update({status: status})
    .eq('id', id)
}

export function addOrderStatusChange(statusHistory) {
  const supabase = createSupabaseClient()
  return supabase
    .from('statusHistory')
    .insert([
      {from: statusHistory.from, to: statusHistory.to, orderId: statusHistory.orderId}
    ])
}

