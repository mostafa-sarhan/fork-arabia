/**
 * Where the site lives, as one absolute origin.
 *
 * Anything that has to be a full URL — the social card's image, the footer's
 * link to the public site — is built from this, so the domain is written
 * once. Per-route canonical and alternate links are the exception: they come
 * from `window.location.origin`, so a preview deployment stays correct.
 */
export const SITE_URL = 'https://forkarabia.sa'
