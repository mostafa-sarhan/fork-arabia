import type { ReactNode } from 'react'
import { Logo } from '@/components/brand/Logo'
import { HeaderNavLink } from '@/components/layout/HeaderNavLink'
import {
  LanguageMenuPanel,
  LanguageMenuTrigger,
} from '@/components/layout/LanguageMenu'
import { Button } from '@/components/ui/Button'
import { LanguageSuggestionCard } from '@/components/layout/LanguageSuggestion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { LanguageMenu } from '@/components/layout/useLanguageMenu'
import type { TranslationKey } from '@/lib/i18n/translations'
import { NAV_ACTIONS, PRIMARY_NAV } from '@/lib/navigation'
import { ROUTE_PATHS } from '@/lib/routing/routes'
import { DocSection } from './DocSection'

const LANGUAGE_NOTES: TranslationKey[] = [
  'ds.header.language.trigger',
  'ds.header.language.options',
  'ds.header.language.keyboard',
  'ds.header.language.exclusive',
  'ds.header.language.mobile',
  'ds.header.language.suggestion',
  'ds.header.language.once',
]

/**
 * The two states of the menu, for the specimen only. The trigger and the
 * panel are the real components — these stubs supply the state they would
 * normally hold, so the documentation cannot show a control the site does
 * not have.
 */
const MENU_STATES: Record<'closed' | 'open', LanguageMenu> = {
  closed: {
    isOpen: false,
    panelId: 'language-menu-specimen-closed',
    toggle: () => {},
    openNow: () => {},
    closeNow: () => {},
    dismiss: () => {},
    registerTrigger: () => {},
    registerPanel: () => {},
  },
  open: {
    isOpen: true,
    panelId: 'language-menu-specimen-open',
    toggle: () => {},
    openNow: () => {},
    closeNow: () => {},
    dismiss: () => {},
    registerTrigger: () => {},
    registerPanel: () => {},
  },
}

const MOBILE_NOTES: TranslationKey[] = [
  'ds.header.mobile.bar',
  'ds.header.mobile.panel',
  'ds.header.mobile.contents',
  'ds.header.mobile.contact',
]

const A11Y_NOTES: TranslationKey[] = [
  'ds.header.a11y.toggle',
  'ds.header.a11y.focus',
  'ds.header.a11y.dismiss',
  'ds.header.a11y.inert',
  'ds.header.a11y.route',
  'ds.header.a11y.motion',
]

/**
 * A specimen of the real bar, not a drawing of one: the same components
 * under the same classes, so it cannot show a header the site does not
 * have. It is `inert` and `aria-hidden`, which keeps a second copy of the
 * navigation out of the tab order and out of the accessibility tree while
 * leaving it pixel-accurate.
 */
function HeaderPreview({ isScrolled }: { isScrolled: boolean }) {
  const { t } = useLanguage()

  return (
    <div
      inert
      aria-hidden="true"
      /*
       * The bar is shown at its real desktop width and scrolls inside this
       * frame rather than being squeezed into the documentation column: a
       * specimen that reflows is a specimen of something the site never
       * renders.
       */
      className="overflow-x-auto rounded-lg border border-line bg-page"
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
              <li key={item.routeId}>
                <HeaderNavLink item={item} isActive={index === 0} />
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageMenuTrigger menu={MENU_STATES.closed} />
            <span aria-hidden="true" className="h-6 w-px bg-line" />
            {NAV_ACTIONS.map((action) => (
              <Button
                key={action.routeId}
                to={ROUTE_PATHS[action.routeId]}
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

export function HeaderSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="header"
      title={t('ds.header.title')}
      description={t('ds.header.desc')}
    >
      <div className="space-y-10">
        <div className="space-y-6">
          <div>
            <SectionHeading level={3} title={t('ds.header.default')} />
            <div className="mt-4">
              <HeaderPreview isScrolled={false} />
            </div>
          </div>

          <div>
            <SectionHeading level={3} title={t('ds.header.scrolled')} />
            <div className="mt-4">
              <HeaderPreview isScrolled />
            </div>
          </div>

          <p className="max-w-narrow text-caption text-ink-muted">
            {t('ds.header.previewNote')}
          </p>

          <p className="max-w-narrow text-body-sm text-ink-muted">
            {t('ds.header.active')}
          </p>
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.header.language')} />
          {/*
            The real trigger and the real panel, in both states, shown in
            place. Inert and hidden from assistive technology so the
            documentation page does not offer a second language switch of
            its own.
          */}
          <div
            inert
            aria-hidden="true"
            className="mt-4 flex flex-wrap items-start gap-10 rounded-lg border border-line bg-page p-6"
          >
            <StateSpecimen label={t('ds.header.language.closed')}>
              <LanguageMenuTrigger menu={MENU_STATES.closed} />
            </StateSpecimen>

            <StateSpecimen label={t('ds.header.language.open')}>
              <LanguageMenuTrigger menu={MENU_STATES.open} />
              <LanguageMenuPanel menu={MENU_STATES.open} placement="inline" />
            </StateSpecimen>

            <StateSpecimen label={t('ds.header.language.suggestionLabel')}>
              <LanguageSuggestionCard />
            </StateSpecimen>
          </div>
          <NoteList items={LANGUAGE_NOTES} />
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.header.mobile')} />
          <NoteList items={MOBILE_NOTES} />
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.header.a11y')} />
          <NoteList items={A11Y_NOTES} />
        </div>
      </div>
    </DocSection>
  )
}
