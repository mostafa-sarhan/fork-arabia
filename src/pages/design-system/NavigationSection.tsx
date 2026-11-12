import { Footer } from '@/components/layout/Footer'
import { ServicesMenuPanel } from '@/components/layout/ServicesMenu'
import type { ServicesMenu } from '@/components/layout/useServicesMenu'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { TranslationKey } from '@/lib/i18n/translations'
import { DocSection } from './DocSection'

/**
 * A permanently open menu, for the specimen only. The panel is the real
 * component — the stub supplies the state it would normally hold, so the
 * documentation cannot show a menu the site does not have.
 */
const OPEN_MENU: ServicesMenu = {
  isOpen: true,
  openNow: () => {},
  closeNow: () => {},
  openSoon: () => {},
  closeSoon: () => {},
  registerTrigger: () => {},
  registerPanel: () => {},
  panelId: 'services-menu-specimen',
}

const MENU_NOTES: TranslationKey[] = [
  'ds.nav.menu.disclosure',
  'ds.nav.menu.pointer',
  'ds.nav.menu.keyboard',
  'ds.nav.menu.dismiss',
  'ds.nav.menu.mobile',
]

const FOOTER_NOTES: TranslationKey[] = [
  'ds.nav.footer.sources',
  'ds.nav.footer.contrast',
  'ds.nav.footer.numbers',
  'ds.nav.footer.social',
]

function NoteList({ items }: { items: TranslationKey[] }) {
  const { t } = useLanguage()

  return (
    <ul className="mt-4 space-y-3">
      {items.map((key) => (
        <li
          key={key}
          className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4"
        >
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 rounded-full bg-turquoise"
          />
          <p className="text-body-sm text-ink">{t(key)}</p>
        </li>
      ))}
    </ul>
  )
}

export function NavigationSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="navigation"
      title={t('ds.nav.title')}
      description={t('ds.nav.desc')}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading level={3} title={t('ds.nav.menu')} />
          <p className="mt-2 max-w-narrow text-body-sm text-ink-muted">
            {t('ds.nav.menuDesc')}
          </p>
          {/*
            Inert and hidden from assistive technology: a second copy of the
            services navigation would otherwise sit in the tab order of a
            page that already has one in its header.
          */}
          <div inert aria-hidden="true" className="mt-4">
            <ServicesMenuPanel menu={OPEN_MENU} placement="inline" />
          </div>
          <NoteList items={MENU_NOTES} />
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.nav.footer')} />
          <div
            inert
            aria-hidden="true"
            className="mt-4 overflow-hidden rounded-lg border border-line"
          >
            <Footer />
          </div>
          <NoteList items={FOOTER_NOTES} />
        </div>
      </div>
    </DocSection>
  )
}
