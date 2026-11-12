import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { GlobeIcon } from '@/components/ui/icons'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { translations } from '@/lib/i18n/translations'
import { DocSection } from './DocSection'

type DirectionPreviewProps = {
  dir: 'rtl' | 'ltr'
  lang: 'ar' | 'en'
  title: string
}

function DirectionPreview({ dir, lang, title }: DirectionPreviewProps) {
  const copy = translations[lang]

  return (
    <div
      dir={dir}
      lang={lang}
      className="rounded-lg border border-line bg-surface p-5"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-md bg-navy-soft text-petrol">
            <GlobeIcon className="size-4" />
          </span>
          <span className="text-body-sm font-semibold text-ink">{title}</span>
        </div>
        <Badge variant="outline" size="sm">
          {dir.toUpperCase()}
        </Badge>
      </div>

      <div className="mt-4 flex items-center gap-3 text-caption text-ink-muted">
        <span>{copy['direction.start']}</span>
        <span className="h-px flex-1 bg-line" />
        <span>{copy['direction.end']}</span>
      </div>

      <div className="relative mt-4">
        <Input
          placeholder={copy['direction.searchPlaceholder']}
          className="pe-10"
        />
        <GlobeIcon className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb
          label={copy['breadcrumb.label']}
          items={[
            { label: copy['breadcrumb.home'], href: '#direction' },
            { label: copy['breadcrumb.services'] },
          ]}
        />
        <Button size="sm">{copy['direction.action']}</Button>
      </div>
    </div>
  )
}

export function DirectionSection() {
  const { t, language, direction, setLanguage } = useLanguage()

  return (
    <DocSection
      id="direction"
      title={t('ds.direction.title')}
      description={t('ds.direction.desc')}
    >
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-4">
        <span className="text-body-sm text-ink-muted">
          {t('direction.current')}
        </span>
        <Badge variant="accent">
          {direction.toUpperCase()} —{' '}
          {language === 'ar' ? t('direction.rtl') : t('direction.ltr')}
        </Badge>

        <div className="ms-auto flex flex-wrap items-center gap-2">
          <span className="text-body-sm text-ink-muted">
            {t('direction.switch')}
          </span>
          <Button
            size="sm"
            variant={language === 'ar' ? 'primary' : 'outline'}
            onClick={() => setLanguage('ar')}
          >
            العربية
          </Button>
          <Button
            size="sm"
            variant={language === 'en' ? 'primary' : 'outline'}
            onClick={() => setLanguage('en')}
          >
            English
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <DirectionPreview
          dir="rtl"
          lang="ar"
          title={translations.ar['direction.previewRtl']}
        />
        <DirectionPreview
          dir="ltr"
          lang="en"
          title={translations.en['direction.previewLtr']}
        />
      </div>

      <p className="mt-4 text-body-sm text-ink-muted">
        {t('direction.note')}
      </p>
    </DocSection>
  )
}
