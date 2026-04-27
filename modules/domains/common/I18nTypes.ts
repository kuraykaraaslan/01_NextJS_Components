import { z } from 'zod'
import ISO6391 from 'iso-639-1'

/* =========================================================
   CONFIG
========================================================= */

const parsedEnvLangs = process.env.NEXT_PUBLIC_I18N_LANGUAGES
  ?.split(',')
  .map((l) => l.trim().toLowerCase())
  .filter((l) => ISO6391.validate(l))

const FALLBACK_LANGS = ['en'] as const

export const AppLanguageEnum = z.enum(
  (parsedEnvLangs && parsedEnvLangs.length > 0
    ? parsedEnvLangs
    : FALLBACK_LANGS) as [string, ...string[]]
)

export type AppLanguage = z.infer<typeof AppLanguageEnum>

export const AVAILABLE_LANGUAGES = AppLanguageEnum.options
export const DEFAULT_LANGUAGE: AppLanguage = AVAILABLE_LANGUAGES[0] ?? 'en'

/* =========================================================
   RTL
========================================================= */

const RTL_SET = new Set(['ar', 'he', 'fa', 'ur'])

export function isRTL(lang: AppLanguage): boolean {
  return RTL_SET.has(lang)
}

export function getDirection(lang: AppLanguage): 'rtl' | 'ltr' {
  return isRTL(lang) ? 'rtl' : 'ltr'
}

/* =========================================================
   DISPLAY
========================================================= */

export function getLanguageName(lang: AppLanguage): string {
  return ISO6391.getName(lang) || lang
}

export const LANG_NAMES: Record<AppLanguage, string> = Object.fromEntries(
  AVAILABLE_LANGUAGES.map((lang) => [
    lang,
    ISO6391.getName(lang) || lang,
  ])
) as Record<AppLanguage, string>

/* =========================================================
   FLAGS (no mapping → pure fallback)
========================================================= */

/**
 * Language → Country heuristic
 * en → US, tr → TR (uppercasing fallback)
 */
function langToCountry(lang: string): string {
  return lang.length === 2 ? lang.toUpperCase() : 'US'
}

function countryCodeToEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    )
}

export function getLangFlag(lang: AppLanguage): string {
  return countryCodeToEmoji(langToCountry(lang))
}

export const LANG_FLAGS: Record<AppLanguage, string> = Object.fromEntries(
  AVAILABLE_LANGUAGES.map((lang) => [lang, getLangFlag(lang)])
) as Record<AppLanguage, string>

/* =========================================================
   GEO FILTER (optional, no hard politics)
========================================================= */

export function isLanguageAccessible(
  _lang: AppLanguage,
  _countryCode?: string | null
): boolean {
  return true
}

export function getFilteredLanguages(): AppLanguage[] {
  return AVAILABLE_LANGUAGES
}

/* =========================================================
   SEO
========================================================= */

export function getOgLocale(lang: AppLanguage): string {
  const cc = langToCountry(lang)
  return `${lang}_${cc}`
}

export function getHrefLang(lang: AppLanguage): string {
  return lang
}

export function getLangFlagUrl(lang: AppLanguage): string {
  const cc = langToCountry(lang).toLowerCase()
  return `https://flagcdn.com/w40/${cc}.png`
}

/* =========================================================
   TYPES
========================================================= */

export type Locale = AppLanguage