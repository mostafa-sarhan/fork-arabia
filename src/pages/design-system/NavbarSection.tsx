import type { ReactNode } from 'react'
import { Logo } from '@/components/brand/Logo'
import {
  LanguageMenuPanel,
  LanguageMenuTrigger,
  type LanguageMenuState,
} from '@/components/navbar/LanguageMenu'
import { NavbarLink } from '@/components/navbar/Navbar'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { NAV_ACTIONS, PRIMARY_NAV } from '@/config/navigation'
import { LanguageSuggestionCard } from '@/layouts/LanguageSuggestion'
import { cn } from '@/lib/cn'
import type { TranslationKey } from '@/lib/i18n/translations'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { DocSection } from './DocSection'

const LANGUAGE_NOTES: TranslationKey[] = [
  'ds.navbar.language.trigger',
  'ds.navbar.language.options',
  'ds.navbar.language.keyboard',
  'ds.navbar.language.exclusive',
  'ds.navbar.language.mobile',
  'ds.navbar.language.suggestion',
  'ds.navbar.language.once',
]

const MOBILE_NOTES: TranslationKey[] = [
  'ds.navbar.mobile.bar',
  'ds.navbar.mobile.panel',
  'ds.navbar.mobile.contents',
  'ds.navbar.mobile.contact',
]

const A11Y_NOTES: TranslationKey[] = [
  'ds.navbar.a11y.toggle',
  'ds.navbar.a11y.focus',
  'ds.navbar.a11y.dismiss',
  'ds.navbar.a11y.inert',
  'ds.navbar.a11y.route',
  'ds.navbar.a11y.motion',
]

/**
 * The two states of the language menu, for the specimen only: the real
 * trigger and panel with the state they would normally hold, so the
 * documentation cannot show a control the site does not have.
 */
const MENU_STATES: Record<'closed' | 'open', LanguageMenuState> = {
  closed: {
    isOpen: false,
    panelId: 'language-menu-specimen-closed',
    toggle: () => {},
    openNow: () => {},
    closeNow: () => {},
    registerTrigger: () => {},
    registerPanel: () => {},
  },
  open: {
    isOpen: true,
    panelId: 'language-menu-specimen-open',
    toggle: () => {},
    openNow: () => {},
    closeNow: () => {},
    registerTrigger: () => {},
    registerPanel: () => {},
  },
}

/**
 * A specimen of the real bar, not a drawing of one: the same components under
 * the same classes. It is `inert` and `aria-hidden`, which keeps a second
 * copy of the navigation out of the tab order and out of the accessibility
 * tree while leaving it pixel-accurate.
 */
function NavbarPreview({ isScrolled }: { isScrolled: boolean }) {
  const { t } = useLanguage()

  return (
    <div
      inert
      aria-hidden="true"
      /* Shown at its real desktop width and scrolling inside this frame: a
         specimen that reflows is a specimen of something the site never
         renders. */
      className="overflow-x-auto rounded-lg border border-line bg-page scrollbar-slim"
    >
      <div
        data-scrolled={isScrolled || undefined}
        className={cn(
          'min-w-content border-b border-line bg-surface',
          'data-scrolled:shadow-header',
        )}
      >
        <div className="mx-auto flex h-header max-w-content items-center justify-between gap-4 px-gutter-lg">
          <Logo className="shrink-0" />

          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((item, index) => (
              <li key={item.path}>
                <NavbarLink item={item} isActive={index === 0} />
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageMenuTrigger menu={MENU_STATES.closed} />
            <span aria-hidden="true" className="h-6 w-px bg-line" />
            {NAV_ACTIONS.map((action) => (
              <Button
                key={action.path}
                to={action.path}
                variant={action.variant}
                size="sm"
              >
                {t(action.labelKey)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-10 min-w-content" />
    </div>
  )
}

/** One labelled state inside the language specimen. */
function StateSpecimen({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-caption font-medium text-ink-muted">{label}</p>
      {children}
    </div>
  )
}

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

export function NavbarSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="navbar"
      title={t('ds.navbar.title')}
      description={t('ds.navbar.desc')}
    >
      <div className="space-y-10">
        <div className="space-y-6">
          <div>
            <SectionHeading level={3} title={t('ds.navbar.default')} />
            <div className="mt-4">
              <NavbarPreview isScrolled={false} />
            </div>
          </div>

          <div>
            <SectionHeading level={3} title={t('ds.navbar.scrolled')} />
            <div className="mt-4">
              <NavbarPreview isScrolled />
            </div>
          </div>

          <p className="max-w-narrow text-caption text-ink-muted">
            {t('ds.navbar.previewNote')}
          </p>

          <p className="max-w-narrow text-body-sm text-ink-muted">
            {t('ds.navbar.active')}
          </p>
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.navbar.language')} />
          {/* The real trigger and panel in both states, inert and hidden so
              this page does not offer a second language switch. */}
          <div
            inert
            aria-hidden="true"
            className="mt-4 flex flex-wrap items-start gap-10 rounded-lg border border-line bg-page p-6"
          >
            <StateSpecimen label={t('ds.navbar.language.closed')}>
              <LanguageMenuTrigger menu={MENU_STATES.closed} />
            </StateSpecimen>

            <StateSpecimen label={t('ds.navbar.language.open')}>
              <LanguageMenuTrigger menu={MENU_STATES.open} />
              <LanguageMenuPanel menu={MENU_STATES.open} placement="inline" />
            </StateSpecimen>

            <StateSpecimen label={t('ds.navbar.language.suggestionLabel')}>
              <LanguageSuggestionCard />
            </StateSpecimen>
          </div>
          <NoteList items={LANGUAGE_NOTES} />
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.navbar.mobile')} />
          <NoteList items={MOBILE_NOTES} />
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.navbar.a11y')} />
          <NoteList items={A11Y_NOTES} />
        </div>
      </div>
    </DocSection>
  )
}
