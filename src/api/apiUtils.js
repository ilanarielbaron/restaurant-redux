import {createClient} from '@supabase/supabase-js'

export function handleResponse(response) {
  if (!response.error) return response.data ?? response
  if (response.error) {
    return {error: response.error.message}
  }
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error)
  throw error
}

export function createSupabaseClient() {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
  return createClient(supabaseUrl, supabaseKey)
}
