import { BrandMarkWatermark } from '@/components/BrandMarkWatermark'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { EyeIcon, TargetIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import { copy, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says: the full vision and mission, Arabic from
 * the storyboard's About page and English from the company profile.
 */
const COPY = {
  visionLabel: copy('رؤيتنا', 'Our Vision'),

  vision: copy(
    'أن نكون الشريك المهني الأكثر تكاملًا وثقةً للشركات والمستثمرين في مصر وأسواق الخليج التي نخدمها، وأن نُسهم في بناء مؤسسات أكثر كفاءة واستدامة وقدرة على النمو.',
    'To be the most integrated and trusted professional partner for companies and investors in Egypt and the Gulf markets we serve, and to help build institutions that are more efficient, sustainable and capable of growth.',
  ),

  missionLabel: copy('رسالتنا', 'Our Mission'),

  mission: copy(
    'تقديم حلول مترابطة تجمع الخبرة القانونية والمالية والإدارية والتقنية، وتتحول من توصيات إلى إجراءات واضحة ومخرجات عملية تدعم القرار وتقلل التعقيد وترفع جودة الأداء.',
    'Delivering interconnected solutions that combine legal, financial, administrative and technology expertise, turning recommendations into clear actions and practical outputs that support decision-making, reduce complexity and raise performance.',
  ),
}

/* Both cards: 28px padding on phones, 52px from 1024. */
const CARD = 'relative overflow-hidden rounded-3xl p-7 lg:p-13'
const VISION_CARD = 'bg-navy'
const MISSION_CARD = 'border border-line bg-surface'

/* 18px, 24px from 1024, at 1.8: sizes used only here. */
const STATEMENT = 'relative mt-6 text-[1.125rem] lg:text-[1.5rem] leading-[1.8] font-semibold'

const ICON_SQUARE = 'flex size-13 shrink-0 items-center justify-center rounded-xl'

export function VisionMissionSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="py-16 lg:py-28 bg-page">
      <Container>
        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal className={cn(CARD, VISION_CARD)}>
            {/* Run off the card's top inline-end corner. */}
            <BrandMarkWatermark
              tone="white"
              className="-end-10 -top-12 h-45 lg:-end-14 lg:-top-16 lg:h-60"
            />

            <div className="relative flex items-center gap-4">
              <span aria-hidden="true" className={cn(ICON_SQUARE, 'bg-turquoise/16 text-turquoise')}>
                <EyeIcon size={24} />
              </span>
              <h2 className="text-body-lg font-bold text-white">{text.visionLabel}</h2>
            </div>

            <p className={cn(STATEMENT, 'text-white')}>{text.vision}</p>
          </Reveal>

          <Reveal delay={120} className={cn(CARD, MISSION_CARD)}>
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className={cn(ICON_SQUARE, 'bg-turquoise-soft text-petrol')}>
                <TargetIcon size={24} />
              </span>
              <h2 className="text-body-lg font-bold text-petrol">{text.missionLabel}</h2>
            </div>

            <p className={cn(STATEMENT, 'text-heading')}>{text.mission}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
