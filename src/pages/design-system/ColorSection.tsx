import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn } from '../../lib/cn'
import {
  AA_LARGE,
  AA_NORMAL,
  contrastRatio,
  formatRatio,
  resolveTokenColor,
  toHex,
  type Rgb,
} from '../../lib/color'
import { useLanguage } from '../../lib/i18n/useLanguage'
import type { TranslationKey } from '../../lib/i18n/translations'
import { DocSection } from './DocSection'

/* -------------------------------------------------------------------------- */
/* Token registry                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Every token this section documents. Values are never written here — they
 * are resolved from the stylesheet at runtime, so `index.css` remains the
 * single source of truth and the measured ratios cannot drift from it.
 */
const TOKENS = [
  '--color-navy',
  '--color-navy-strong',
  '--color-navy-soft',
  '--color-petrol',
  '--color-turquoise',
  '--color-turquoise-lift',
  '--color-turquoise-soft',
  '--color-page',
  '--color-surface',
  '--color-ink',
  '--color-ink-muted',
  '--color-line',
  '--color-danger',
  '--color-danger-strong',
  '--color-danger-soft',
  '--color-on-accent',
  '--color-heading',
  '--color-subheading',
  '--color-link',
  '--color-link-hover',
] as const

type Token = (typeof TOKENS)[number]

type Palette = Partial<Record<Token, Rgb>>

/**
 * Resolved once per page load. The palette cannot change at runtime, so
 * probing it on first render and memoizing is both cheaper and simpler than
 * holding it in state, and it avoids a render pass that shows no values.
 */
let cachedPalette: Palette | null = null

function readPalette(): Palette {
  if (typeof document === 'undefined') {
    return {}
  }

  if (cachedPalette) {
    return cachedPalette
  }

  const resolved: Palette = {}

  for (const token of TOKENS) {
    const color = resolveTokenColor(token)

    if (color) {
      resolved[token] = color
    }
  }

  cachedPalette = resolved

  return resolved
}

/** A color chip. Takes a resolved value so the caller owns the lookup. */
function Dot({ color, className }: { color: Rgb | undefined; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'size-4 shrink-0 rounded-full border border-line',
        className,
      )}
      style={{ backgroundColor: color ? toHex(color) : undefined }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Swatches                                                                   */
/* -------------------------------------------------------------------------- */

type Swatch = {
  nameKey: TranslationKey
  token: Token
  swatchClassName: string
  usageKey: TranslationKey
  bordered?: boolean
}

const OFFICIAL: Swatch[] = [
  {
    nameKey: 'color.navy',
    token: '--color-navy',
    swatchClassName: 'bg-navy',
    usageKey: 'color.usage.primary',
  },
  {
    nameKey: 'color.petrol',
    token: '--color-petrol',
    swatchClassName: 'bg-petrol',
    usageKey: 'color.usage.secondary',
  },
  {
    nameKey: 'color.turquoise',
    token: '--color-turquoise',
    swatchClassName: 'bg-turquoise',
    usageKey: 'color.usage.accent',
  },
]

const SUPPORTING: Swatch[] = [
  {
    nameKey: 'color.turquoiseLift',
    token: '--color-turquoise-lift',
    swatchClassName: 'bg-turquoise-lift',
    usageKey: 'color.usage.accentHover',
  },
  {
    nameKey: 'color.surface',
    token: '--color-surface',
    swatchClassName: 'bg-surface',
    usageKey: 'color.usage.surface',
    bordered: true,
  },
  {
    nameKey: 'color.page',
    token: '--color-page',
    swatchClassName: 'bg-page',
    usageKey: 'color.usage.background',
    bordered: true,
  },
  {
    nameKey: 'color.ink',
    token: '--color-ink',
    swatchClassName: 'bg-ink',
    usageKey: 'color.usage.text',
  },
  {
    nameKey: 'color.muted',
    token: '--color-ink-muted',
    swatchClassName: 'bg-ink-muted',
    usageKey: 'color.usage.muted',
  },
  {
    nameKey: 'color.border',
    token: '--color-line',
    swatchClassName: 'bg-line',
    usageKey: 'color.usage.border',
    bordered: true,
  },
  {
    nameKey: 'color.danger',
    token: '--color-danger',
    swatchClassName: 'bg-danger',
    usageKey: 'color.usage.danger',
  },
]

function SwatchCard({
  swatch,
  palette,
}: {
  swatch: Swatch
  palette: Palette
}) {
  const { t } = useLanguage()
  const color = palette[swatch.token]

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-xs">
      <div
        className={cn(
          'h-20 w-full',
          swatch.swatchClassName,
          swatch.bordered && 'border-b border-line',
        )}
      />
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-body-sm font-semibold text-ink">
            {t(swatch.nameKey)}
          </span>
          <code dir="ltr" className="text-caption text-ink-muted">
            {color ? toHex(color) : '—'}
          </code>
        </div>
        <code
          dir="ltr"
          className="mt-1 block text-caption text-ink-muted/70"
        >
          {swatch.token}
        </code>
        <p className="mt-1.5 text-caption text-ink-muted">
          {t(swatch.usageKey)}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Semantic roles                                                             */
/* -------------------------------------------------------------------------- */

const ROLES: Array<{
  nameKey: TranslationKey
  token: Token
  resolvesTo: string
  usageKey: TranslationKey
}> = [
  {
    nameKey: 'role.heading',
    token: '--color-heading',
    resolvesTo: '--color-navy',
    usageKey: 'role.usage.heading',
  },
  {
    nameKey: 'role.subheading',
    token: '--color-subheading',
    resolvesTo: '--color-petrol',
    usageKey: 'role.usage.subheading',
  },
  {
    nameKey: 'role.link',
    token: '--color-link',
    resolvesTo: '--color-petrol',
    usageKey: 'role.usage.link',
  },
  {
    nameKey: 'role.linkHover',
    token: '--color-link-hover',
    resolvesTo: '--color-navy',
    usageKey: 'role.usage.linkHover',
  },
  {
    nameKey: 'role.onAccent',
    token: '--color-on-accent',
    resolvesTo: '--color-navy',
    usageKey: 'role.usage.onAccent',
  },
]

/* -------------------------------------------------------------------------- */
/* Contrast pairs                                                             */
/* -------------------------------------------------------------------------- */

type Pair = {
  labelKey: TranslationKey
  foreground: Token
  background: Token
  /** Set when the pair is documented as prohibited. */
  reasonKey?: TranslationKey
}

const APPROVED: Pair[] = [
  {
    labelKey: 'pair.bodyOnPage',
    foreground: '--color-ink',
    background: '--color-page',
  },
  {
    labelKey: 'pair.bodyOnSurface',
    foreground: '--color-ink',
    background: '--color-surface',
  },
  {
    labelKey: 'pair.subheadingOnSurface',
    foreground: '--color-subheading',
    background: '--color-surface',
  },
  {
    labelKey: 'pair.mutedOnSurface',
    foreground: '--color-ink-muted',
    background: '--color-surface',
  },
  {
    labelKey: 'pair.primaryButton',
    foreground: '--color-surface',
    background: '--color-navy',
  },
  {
    labelKey: 'pair.accentButton',
    foreground: '--color-on-accent',
    background: '--color-turquoise',
  },
  {
    labelKey: 'pair.accentButtonHover',
    foreground: '--color-on-accent',
    background: '--color-turquoise-lift',
  },
  {
    labelKey: 'pair.accentBadge',
    foreground: '--color-subheading',
    background: '--color-turquoise-soft',
  },
  {
    labelKey: 'pair.neutralBadge',
    foreground: '--color-navy',
    background: '--color-navy-soft',
  },
  {
    labelKey: 'pair.logoMark',
    foreground: '--color-turquoise',
    background: '--color-navy',
  },
  {
    labelKey: 'pair.errorText',
    foreground: '--color-danger-strong',
    background: '--color-danger-soft',
  },
  {
    labelKey: 'pair.destructiveButton',
    foreground: '--color-surface',
    background: '--color-danger',
  },
]

const PROHIBITED: Pair[] = [
  {
    labelKey: 'pair.whiteOnTurquoise',
    foreground: '--color-surface',
    background: '--color-turquoise',
    reasonKey: 'pair.reason.useOnAccent',
  },
  {
    labelKey: 'pair.turquoiseOnWhite',
    foreground: '--color-turquoise',
    background: '--color-surface',
    reasonKey: 'pair.reason.usePetrol',
  },
]

function Verdict({ passes }: { passes: boolean }) {
  const { t } = useLanguage()

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-caption font-semibold',
        passes
          ? 'bg-turquoise-soft text-petrol'
          : 'bg-danger-soft text-danger-strong',
      )}
    >
      {passes ? t('ds.colors.pass') : t('ds.colors.fail')}
    </span>
  )
}

function PairSwatch({ pair, palette }: { pair: Pair; palette: Palette }) {
  const foreground = palette[pair.foreground]
  const background = palette[pair.background]

  return (
    <span
      aria-hidden="true"
      className="grid size-8 shrink-0 place-items-center rounded-md border border-line text-caption font-bold"
      style={{
        backgroundColor: background ? toHex(background) : undefined,
        color: foreground ? toHex(foreground) : undefined,
      }}
    >
      Aa
    </span>
  )
}

function ContrastTable({
  pairs,
  palette,
  showReason,
}: {
  pairs: Pair[]
  palette: Palette
  showReason?: boolean
}) {
  const { t } = useLanguage()

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface">
      <table className="w-full min-w-narrow border-collapse text-body-sm">
        <thead>
          <tr className="border-b border-line text-caption font-semibold text-ink-muted">
            <th scope="col" className="px-4 py-3 text-start">
              {t('ds.colors.th.pair')}
            </th>
            <th scope="col" className="px-4 py-3 text-start">
              {t('ds.colors.th.ratio')}
            </th>
            <th scope="col" className="px-4 py-3 text-start">
              {t('ds.colors.th.normal')}
            </th>
            <th scope="col" className="px-4 py-3 text-start">
              {t('ds.colors.th.large')}
            </th>
            <th scope="col" className="px-4 py-3 text-start">
              {showReason
                ? t('ds.colors.th.usage')
                : t('ds.colors.th.where')}
            </th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair) => {
            const foreground = palette[pair.foreground]
            const background = palette[pair.background]
            const ratio =
              foreground && background
                ? contrastRatio(foreground, background)
                : null

            return (
              <tr
                key={`${pair.foreground}-${pair.background}`}
                className="border-b border-line last:border-b-0"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <PairSwatch pair={pair} palette={palette} />
                    <div className="min-w-0">
                      <span className="block font-medium text-ink">
                        {t(pair.labelKey)}
                      </span>
                      <code
                        dir="ltr"
                        className="block text-caption text-ink-muted/70"
                      >
                        {pair.foreground.replace('--color-', '')}
                        {' on '}
                        {pair.background.replace('--color-', '')}
                      </code>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <code
                    dir="ltr"
                    className="font-semibold tabular-nums text-ink"
                  >
                    {ratio ? formatRatio(ratio) : t('ds.colors.measuring')}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {ratio ? <Verdict passes={ratio >= AA_NORMAL} /> : null}
                </td>
                <td className="px-4 py-3">
                  {ratio ? <Verdict passes={ratio >= AA_LARGE} /> : null}
                </td>
                <td className="px-4 py-3 text-ink-muted">
                  {showReason && pair.reasonKey
                    ? t(pair.reasonKey)
                    : t(pair.labelKey)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function ColorSection() {
  const { t } = useLanguage()
  const palette = readPalette()

  return (
    <DocSection
      id="colors"
      title={t('ds.colors.title')}
      description={t('ds.colors.desc')}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading level={3} title={t('ds.colors.official')} />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICIAL.map((swatch) => (
              <SwatchCard
                key={swatch.token}
                swatch={swatch}
                palette={palette}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.colors.supporting')} />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTING.map((swatch) => (
              <SwatchCard
                key={swatch.token}
                swatch={swatch}
                palette={palette}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.colors.rules')} />
          <p className="mt-2 max-w-narrow text-body-sm text-ink-muted">
            {t('ds.colors.rulesDesc')}
          </p>
          <ul className="mt-4 space-y-3">
            {(
              [
                ['--color-navy', 'ds.colors.rule.navy'],
                ['--color-petrol', 'ds.colors.rule.petrol'],
                ['--color-turquoise', 'ds.colors.rule.turquoise'],
              ] as const satisfies ReadonlyArray<readonly [Token, TranslationKey]>
            ).map(([token, ruleKey]) => (
              <li
                key={token}
                className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4"
              >
                <Dot color={palette[token]} className="mt-0.5" />
                <p className="text-body-sm text-ink">{t(ruleKey)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.colors.roles')} />
          <p className="mt-2 max-w-narrow text-body-sm text-ink-muted">
            {t('ds.colors.rolesDesc')}
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-panel border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-line text-caption font-semibold text-ink-muted">
                  <th scope="col" className="px-4 py-3 text-start">
                    {t('ds.colors.th.role')}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start">
                    {t('ds.colors.th.resolves')}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start">
                    {t('ds.colors.th.usage')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROLES.map((role) => (
                  <tr
                    key={role.token}
                    className="border-b border-line last:border-b-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Dot color={palette[role.token]} />
                        <div className="min-w-0">
                          <span className="block font-medium text-ink">
                            {t(role.nameKey)}
                          </span>
                          <code
                            dir="ltr"
                            className="block text-caption text-ink-muted/70"
                          >
                            {role.token}
                          </code>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code dir="ltr" className="text-caption text-ink-muted">
                        {role.resolvesTo}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {t(role.usageKey)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.colors.contrast')} />
          <p className="mt-2 max-w-narrow text-body-sm text-ink-muted">
            {t('ds.colors.contrastDesc')}
          </p>

          <h4 className="mt-6 text-body font-semibold text-ink">
            {t('ds.colors.approved')}
          </h4>
          <ContrastTable pairs={APPROVED} palette={palette} />

          <h4 className="mt-8 text-body font-semibold text-ink">
            {t('ds.colors.prohibited')}
          </h4>
          <p className="mt-2 max-w-narrow text-body-sm text-ink-muted">
            {t('ds.colors.prohibitedDesc')}
          </p>
          <ContrastTable pairs={PROHIBITED} palette={palette} showReason />
        </div>
      </div>
    </DocSection>
  )
}
