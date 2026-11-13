import { Button } from '@/components/ui/Button'
import { CONSULTATION_TIMING } from '@/config/consultation'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/* The navy card, 24px in, 20px radius. */
const CARD = 'rounded-2xl bg-navy p-6'

/* The card is narrow and shares the sticky aside, so its title stays small. */
const TITLE = 'font-display text-h4 font-extrabold text-balance text-white'

/* 46px buttons: the aside's two cards have to fit a laptop screen whole. */
const BUTTON = 'h-11.5'

/**
 * The booking card beside a sector's services: the sector's own question,
 * the consultation's timing and the two calls to action.
 */
export function SectorBookingCard({ title }: { title: string }) {
  const { language, t } = useLanguage()

  return (
    <div className={CARD}>
      <h2 className={TITLE}>{title}</h2>
      <p className="mt-2 text-body-sm leading-[1.7] text-white/75">
        {resolveCopy(CONSULTATION_TIMING, language)}
      </p>

      <div className="mt-5 flex flex-col gap-3">
        <Button
          to={PATHS.bookConsultation}
          variant="secondary"
          size="lg"
          fullWidth
          className={cn(BUTTON, 'focus-visible:ring-offset-navy')}
        >
          {t('nav.bookConsultation')}
        </Button>
        <Button to={PATHS.requestQuote} variant="outline-on-navy" size="lg" fullWidth className={BUTTON}>
          {t('nav.requestQuote')}
        </Button>
      </div>
    </div>
  )
}
