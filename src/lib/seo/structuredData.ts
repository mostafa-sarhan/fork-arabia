import { SITE_CONTACT } from '@/config/contact'
import { SERVED_COUNTRIES } from '@/config/countries'
import { OFFICES } from '@/config/offices'
import { sectorPath } from '@/config/paths'
import { SITE_URL } from '@/config/site'
import { SOCIAL_NETWORKS } from '@/config/social'
import { COUNTRIES } from '@/data/sectors/countries'
import type { SectorDetail } from '@/data/sectors/types'
import { COMPANY_DESCRIPTION } from '@/data/siteCopy'
import { LANGUAGES, type Language } from '@/lib/i18n/languageConfig'
import { resolveCopy } from '@/lib/i18n/localized'
import { translations } from '@/lib/i18n/translations'
import { absoluteUrl } from './pageHead'

/*
 * schema.org data (JSON-LD), built from config so it says what the page
 * says. Rendered by <JsonLd>: the Organization on every page (the layout),
 * a BreadcrumbList with every visible breadcrumb, and the services list
 * on a sector page.
 */

/** One id for the company, so every page's data points at the same organization. */
const ORGANIZATION_ID = `${SITE_URL}/#organization`

/** The square app icon: the mark on navy, 512px (public/icon-512.png). */
const LOGO_URL = `${SITE_URL}/icon-512.png`

const EMAIL = SITE_CONTACT.find((channel) => channel.id === 'email')!.display

/** "tel:+966550087404" → "+966550087404". */
const phoneOf = (href: string) => href.replace('tel:', '')

/**
 * The company: its names in both languages, its site, logo, social
 * profiles, contact points (each office's phone, the email), the countries
 * it serves, and its two offices (as the Presence page shows them).
 */
export function organizationJsonLd(language: Language) {
  const name = translations[language]['brand.legal']
  const otherNames = LANGUAGES.filter((other) => other !== language).map((other) => translations[other]['brand.legal'])
  const areaServed = SERVED_COUNTRIES.map((country) => ({ '@type': 'Country', name: resolveCopy(country.name, language) }))

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name,
    alternateName: otherNames,
    url: absoluteUrl('/', language),
    logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
    description: resolveCopy(COMPANY_DESCRIPTION, language),
    foundingDate: '2016',
    email: EMAIL,
    sameAs: SOCIAL_NETWORKS.map((network) => network.url),
    contactPoint: OFFICES.flatMap((office) =>
      office.phones.map((phone) => ({
        '@type': 'ContactPoint',
        contactType: 'customer service',
        name: `${name} — ${resolveCopy(office.label, language)}`,
        telephone: phoneOf(phone.href),
        email: EMAIL,
        areaServed,
        availableLanguage: ['ar', 'en'],
      })),
    ),
    location: OFFICES.map((office) => ({
      '@type': 'Place',
      name: `${name} — ${resolveCopy(office.label, language)}`,
      hasMap: office.mapUrl,
      telephone: office.phones.map((phone) => phoneOf(phone.href)),
      address: {
        '@type': 'PostalAddress',
        streetAddress: resolveCopy(office.address, language),
        addressLocality: resolveCopy(office.name, language),
        addressCountry: COUNTRIES[office.country].code,
      },
    })),
  }
}

/** A breadcrumb as the page shows it: its words, and its page's absolute URL. */
export type BreadcrumbEntry = { name: string; url: string }

/** The trail, in order; the last entry is the page itself. */
export function breadcrumbJsonLd(entries: readonly BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.url,
    })),
  }
}

/** A sector's services, each linking to its block on the page (#id). */
export function sectorServicesJsonLd(sector: SectorDetail, language: Language) {
  const page = absoluteUrl(sectorPath(sector.slug), language)

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: resolveCopy(sector.title, language),
    url: page,
    numberOfItems: sector.services.length,
    itemListElement: sector.services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: resolveCopy(service.title, language),
      url: `${page}#${service.id}`,
    })),
  }
}
