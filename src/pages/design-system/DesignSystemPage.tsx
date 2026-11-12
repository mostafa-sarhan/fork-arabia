import { useEffect, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { TranslationKey } from '@/lib/i18n/translations'
import { usePageMeta } from '@/lib/usePageMeta'
import { ButtonSection } from './ButtonSection'
import { ColorSection } from './ColorSection'
import { ComponentSection } from './ComponentSection'
import { DirectionSection } from './DirectionSection'
import { FormSection } from './FormSection'
import { IconSection } from './IconSection'
import { LayoutSection } from './LayoutSection'
import { NavbarSection } from './NavbarSection'
import { NavigationSection } from './NavigationSection'
import { TypographySection } from './TypographySection'

const SECTIONS = [
  { id: 'colors', labelKey: 'ds.section.colors' },
  { id: 'typography', labelKey: 'ds.section.typography' },
  { id: 'buttons', labelKey: 'ds.section.buttons' },
  { id: 'forms', labelKey: 'ds.section.forms' },
  { id: 'components', labelKey: 'ds.section.components' },
  { id: 'layout', labelKey: 'ds.section.layout' },
  { id: 'icons', labelKey: 'ds.section.icons' },
  { id: 'direction', labelKey: 'ds.section.direction' },
  { id: 'navbar', labelKey: 'ds.section.navbar' },
  { id: 'navigation', labelKey: 'ds.section.navigation' },
] as const satisfies ReadonlyArray<{
  id: string
  labelKey: TranslationKey
}>

const SECTION_IDS = SECTIONS.map((section) => section.id)
const YEAR = new Date().getFullYear()

function useActiveSection(): string {
  const [active, setActive] = useState<string>(SECTION_IDS[0] ?? '')

  useEffect(() => {
    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )

        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return active
}

export default function DesignSystemPage() {
  const { t, direction } = useLanguage()
  const active = useActiveSection()

  usePageMeta({ titleKey: 'ds.title', indexable: false })

  return (
    <div className="min-h-main bg-page">
      <div className="border-b border-line bg-surface">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{t('ds.version')}</Badge>
            <Badge variant="outline">{direction.toUpperCase()}</Badge>
          </div>
          <SectionHeading
            className="mt-5"
            level={1}
            title={t('ds.title')}
            description={t('ds.subtitle')}
          />
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-below-header lg:self-start">
            <nav aria-label={t('ds.onThisPage')}>
              <p className="text-overline tracking-latin-wide text-ink-muted">
                {t('ds.onThisPage')}
              </p>
              <ul className="mt-3 flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {SECTIONS.map((section) => {
                  const isActive = active === section.id

                  return (
                    <li key={section.id} className="shrink-0">
                      <a
                        href={`#${section.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'block whitespace-nowrap rounded-md px-3 py-2 text-body-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2',
                          isActive
                            ? 'bg-navy-soft font-semibold text-navy'
                            : 'text-ink-muted hover:bg-navy-soft/60 hover:text-ink',
                        )}
                      >
                        {t(section.labelKey)}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 space-y-16 lg:space-y-20">
            <ColorSection />
            <TypographySection />
            <ButtonSection />
            <FormSection />
            <ComponentSection />
            <LayoutSection />
            <IconSection />
            <DirectionSection />
            <NavbarSection />
            <NavigationSection />
          </div>
        </div>
      </Container>

      <footer className="border-t border-line bg-surface">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-caption text-ink-muted sm:flex-row sm:items-center">
          <span>{t('footer.note')}</span>
          <span>
            © {YEAR} {t('brand.legal')}. {t('footer.rights')}
          </span>
        </Container>
      </footer>
    </div>
  )
}
