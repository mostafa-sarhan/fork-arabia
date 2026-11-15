import { Button } from '@/components/ui/Button'
import { ChatIcon } from '@/components/ui/icons'
import { SITE_CONTACT } from '@/config/contact'
import { WHATSAPP_LABEL } from '@/config/whatsapp'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/* The company's WhatsApp line, from config/contact.ts. */
const WHATSAPP = SITE_CONTACT.find((channel) => channel.id === 'whatsapp')

/** "Message us on WhatsApp": a full-width turquoise button opening the chat in a new tab. */
export function WhatsAppButton() {
  const { language } = useLanguage()

  if (!WHATSAPP) {
    return null
  }

  return (
    <Button href={WHATSAPP.href} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" className="h-12 w-full">
      <ChatIcon size={20} />
      {resolveCopy(WHATSAPP_LABEL, language)}
    </Button>
  )
}
