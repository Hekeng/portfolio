import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '../locales/en/common.json'
import deCommon from '../locales/de/common.json'
import ruCommon from '../locales/ru/common.json'

export const SUPPORTED_LANGS = ['en', 'de', 'ru'] as const

export type SupportedLng = (typeof SUPPORTED_LANGS)[number]

export const DEFAULT_LANG: SupportedLng = 'en'

export const LANG_STORAGE_KEY = 'lng'

/**
 * Checks whether the given language code is supported.
 */
export function isSupportedLang(lng: string): lng is SupportedLng {
	const isSupported = SUPPORTED_LANGS.includes(lng as SupportedLng)
	return isSupported
}

/**
 * Reads saved language from localStorage (browser only).
 * Returns null when storage is empty or value is not supported.
 */
export function readStoredLang(): SupportedLng | null {
	if (typeof window === 'undefined') {
		return null
	}

	const storedValue = localStorage.getItem(LANG_STORAGE_KEY)

	if (!storedValue) {
		return null
	}

	if (!isSupportedLang(storedValue)) {
		return null
	}

	return storedValue
}

/**
 * Saves language choice to localStorage (browser only).
 */
export function saveStoredLang(lng: SupportedLng): void {
	if (typeof window === 'undefined') {
		return
	}

	localStorage.setItem(LANG_STORAGE_KEY, lng)
}

/**
 * Picks initial language: saved → browser → default.
 */
export function resolveInitialLang(): SupportedLng {
	const storedLang = readStoredLang()

	if (storedLang) {
		return storedLang
	}

	if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
		const browserLang = navigator.language.slice(0, 2)

		if (isSupportedLang(browserLang)) {
			return browserLang
		}
	}

	return DEFAULT_LANG
}

// UI copy only. Path maps live in locales/{lng}/routes.json and are loaded
// by localizedPaths.ts — never via t() / i18next namespaces.
const resources = {
	en: {
		common: enCommon,
	},
	de: {
		common: deCommon,
	},
	ru: {
		common: ruCommon,
	},
}

void i18n.use(initReactI18next).init({
	resources: resources,
	lng: DEFAULT_LANG,
	fallbackLng: DEFAULT_LANG,
	defaultNS: 'common',
	ns: ['common'],
	interpolation: {
		escapeValue: false,
	},
})

export default i18n
