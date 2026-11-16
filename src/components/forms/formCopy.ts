import { copy } from '@/lib/i18n/localized'

/*
 * The words every form shares: the contact fields' labels (the booking
 * page's, from the storyboard; English written here, `draft`) and the
 * forms' own states (`proposed` in both languages). All are listed in
 * docs/copy-review.md.
 */
export const FORM_COPY = {
  name: copy('الاسم الكامل', 'Full name'),
  email: copy('البريد الإلكتروني', 'Email'),
  phone: copy('رقم الهاتف', 'Phone number'),
  country: copy('الدولة', 'Country'),

  /* The first, empty option of a select. */
  choose: copy('اختر من القائمة', 'Select an option'),

  /* A searchable dropdown's search box, and its empty result. */
  search: copy('اكتب للبحث', 'Type to search'),
  noResults: copy('لا توجد نتائج', 'No results'),

  /* The success dialog's title, for every form. */
  successTitle: copy('تم إرسال طلبك بنجاح', 'Your request has been sent'),

  /* At the top of a form submitted with fields to fix. */
  incomplete: copy('يرجى استكمال الحقول المطلوبة', 'Please complete the required fields.'),

  sendError: copy(
    'تعذّر إرسال الطلب. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.',
    'We couldn’t send your request. Check your connection and try again.',
  ),
  retry: copy('إعادة المحاولة', 'Try again'),
  backHome: copy('العودة إلى الرئيسية', 'Back to home'),
}
