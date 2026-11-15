import { track } from '@/lib/analytics'
import type { Language } from '@/lib/i18n/languageConfig'

/*
 * Every form on the site is delivered by Web3Forms: one JSON POST, and the
 * message arrives in the company's inbox. The access key is public by
 * design (it only allows sending to that inbox) but kept out of the
 * repository; see .env.example.
 */
const ENDPOINT = 'https://api.web3forms.com/submit'
const FROM_NAME = 'FORK ARABIA Website'

/* How the page language is written in the email. */
const LANGUAGE_NAMES: Record<Language, string> = { ar: 'العربية', en: 'English' }

export type FormSubmission = {
  /** Which form, for the anonymous form_submitted event. */
  form: 'booking' | 'quote' | 'contact'
  /** The email's subject line. */
  subject: string
  /** The visitor's email, so a reply goes straight to them. */
  replyTo: string
  language: Language
  /** What the visitor entered, as readable label → readable value. */
  fields: Record<string, string>
  /** The honeypot: true only if a bot ticked the hidden box. */
  botcheck: boolean
}

/**
 * Sends one form. Resolves true when Web3Forms accepted it, false for
 * anything else — a missing key, a network failure, a refusal — so the
 * form shows its error state rather than crashing.
 */
export async function submitForm(submission: FormSubmission): Promise<boolean> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

  if (!accessKey) {
    if (import.meta.env.DEV) {
      console.warn('VITE_WEB3FORMS_KEY is not set: forms cannot be sent. See .env.example.')
    }
    return false
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: submission.subject,
        from_name: FROM_NAME,
        replyto: submission.replyTo,
        botcheck: submission.botcheck,
        'Page language': LANGUAGE_NAMES[submission.language],
        ...submission.fields,
      }),
    })
    const result: { success?: boolean } = await response.json()
    const sent = response.ok && result.success === true

    /* Counted only when it really arrived, and never for the honeypot: which form and the page language, nothing the visitor typed. */
    if (sent && !submission.botcheck) track('form_submitted', { form: submission.form, lang: submission.language })

    return sent
  } catch {
    return false
  }
}
