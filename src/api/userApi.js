import { createSupabaseClient } from "./apiUtils";

export function registerUser(user) {
  const supabase = createSupabaseClient()
  return supabase.auth.signUp({
    email: user.user,
    password: user.password
  })
}

export function makeUserOwner(user, id) {
  const supabase = createSupabaseClient()
  return supabase
    .from('userType')
    .insert([
      { userId: id, isOwner: !!user.isOwner },
    ])
}

export function getUserType(id) {
  const supabase = createSupabaseClient()
  return supabase
    .from('userType')
    .select('isOwner')
    .eq('userId', id)
}

export function loginUser(user) {
  const supabase = createSupabaseClient()
  return supabase.auth.signIn({
    email: user.user,
    password: user.password
  })
}

export function getUser() {
  const supabase = createSupabaseClient()
  return supabase.auth.user()
}

export function logout() {
  const supabase = createSupabaseClient()
  return supabase.auth.signOut()
}
