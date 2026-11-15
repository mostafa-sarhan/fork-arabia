import { proposed } from '@/lib/i18n/localized'

/*
 * The privacy policy's name and its last update, shared by its page, the
 * footer's bottom bar and the forms' consent line. `proposed`, pending
 * client and legal approval (docs/copy-review.md).
 */
export const PRIVACY_TITLE = proposed('سياسة الخصوصية', 'Privacy Policy')

/**
 * When the policy last changed, shown under its title. Update both with
 * every change. Written out rather than formatted with Intl: Safari puts
 * an Arabic comma in the Arabic date («15 نوفمبر، 2026») where the build
 * does not, and the prerendered page would no longer match.
 */
export const PRIVACY_UPDATED = { ar: '15 نوفمبر 2026', en: '15 November 2026' } as const
