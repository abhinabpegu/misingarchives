// Artisans log in with a USERNAME. Supabase needs an email, so we quietly
// turn the username into a made-up address. Nothing is ever emailed to it.
// Must match EMAIL_DOMAIN in the manage-artisan Edge Function.
export const ARTISAN_EMAIL_DOMAIN = 'artisan.misingarchives.co.in'

export const usernameToEmail = (username) =>
  `${username.trim().toLowerCase()}@${ARTISAN_EMAIL_DOMAIN}`