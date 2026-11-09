import { Button } from '../../components/ui/Button'
import { Checkbox, Radio } from '../../components/ui/Choice'
import {
  ErrorMessage,
  FormLabel,
  HelperText,
} from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import { useLanguage } from '../../lib/i18n/useLanguage'
import { DocSection } from './DocSection'

export function FormSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="forms"
      title={t('ds.forms.title')}
      description={t('ds.forms.desc')}
    >
      <div className="rounded-lg border border-line bg-surface p-6 shadow-xs sm:p-8">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <FormLabel htmlFor="ds-name" required>
                {t('form.fullName')}
              </FormLabel>
              <Input
                id="ds-name"
                name="name"
                autoComplete="name"
                placeholder={t('form.namePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="ds-email" required>
                {t('form.email')}
              </FormLabel>
              <Input
                id="ds-email"
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="name@example.com"
                aria-describedby="ds-email-hint"
              />
              <HelperText id="ds-email-hint">{t('form.hint')}</HelperText>
            </div>
          </div>

          <div className="space-y-2">
            <FormLabel htmlFor="ds-country">{t('form.country')}</FormLabel>
            <Select id="ds-country" name="country" defaultValue="">
              <option value="" disabled>
                {t('form.selectPlaceholder')}
              </option>
              <option value="sa">{t('form.country.sa')}</option>
              <option value="ae">{t('form.country.ae')}</option>
              <option value="other">{t('form.country.other')}</option>
            </Select>
          </div>

          <div className="space-y-2">
            <FormLabel htmlFor="ds-message">{t('form.message')}</FormLabel>
            <Textarea
              id="ds-message"
              name="message"
              placeholder={t('form.messagePlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <FormLabel htmlFor="ds-email-error" required>
              {t('form.email')} — {t('form.errorLabel')}
            </FormLabel>
            <Input
              id="ds-email-error"
              name="email-error"
              type="email"
              dir="ltr"
              defaultValue="not-an-email"
              invalid
              aria-describedby="ds-email-error-message"
            />
            <ErrorMessage id="ds-email-error-message">
              {t('form.error')}
            </ErrorMessage>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-label font-medium text-ink">
              {t('form.contactMethod')}
            </legend>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <Radio
                name="contact-method"
                value="email"
                defaultChecked
                label={t('form.emailOption')}
              />
              <Radio
                name="contact-method"
                value="phone"
                label={t('form.phoneOption')}
              />
            </div>
          </fieldset>

          <Checkbox name="terms" label={t('form.terms')} />

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit">{t('form.submit')}</Button>
            <Button type="reset" variant="outline">
              {t('form.reset')}
            </Button>
          </div>
        </form>
      </div>
    </DocSection>
  )
}
