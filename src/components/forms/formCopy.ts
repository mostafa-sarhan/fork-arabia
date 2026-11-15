import { draft, proposed } from '@/lib/i18n/localized'

/*
 * The words every form shares: the contact fields' labels (the booking
 * page's, from the storyboard; English written here, `draft`) and the
 * forms' own states (`proposed` in both languages). All are listed in
 * docs/copy-review.md.
 */
export const FORM_COPY = {
  name: draft('الاسم الكامل', 'Full name'),
  email: draft('البريد الإلكتروني', 'Email'),
  phone: draft('رقم الهاتف', 'Phone number'),
  country: draft('الدولة', 'Country'),
  otherCountry: proposed('دولة أخرى', 'Other country'),

  /* The first, empty option of a select. */
  choose: proposed('اختر من القائمة', 'Select an option'),

  /* At the top of a form submitted with fields to fix. */
  incomplete: proposed('يرجى استكمال الحقول المطلوبة', 'Please complete the required fields.'),

  sendError: proposed(
    'تعذّر إرسال الطلب. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.',
    'We couldn’t send your request. Check your connection and try again.',
  ),
  retry: proposed('إعادة المحاولة', 'Try again'),
  backHome: proposed('العودة إلى الرئيسية', 'Back to home'),
}
