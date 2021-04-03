import { createSupabaseClient } from "./apiUtils";

export function registerUser(user) {
  const supabase = createSupabaseClient()
  return supabase.auth.signUp({
    email: user.user,
    password: user.password,
    isOwner: user.isOwner
  })
}

export function logout() {
  const supabase = createSupabaseClient()
  return supabase.auth.signOut()
}
