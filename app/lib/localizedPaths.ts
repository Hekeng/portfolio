import { DEFAULT_LANG, type SupportedLng } from './i18n'

import enRoutes from '../locales/en/routes.json'
import deRoutes from '../locales/de/routes.json'
import ruRoutes from '../locales/ru/routes.json'

export const PAGE_IDS = ['home', 'projects', 'contacts', 'skills'] as const

export type PageId = (typeof PAGE_IDS)[number]

/**
 * Path maps live in locales/{lng}/routes.json (routing config, not UI copy).
 * They are imported here on purpose — do NOT register them in i18next / t().
 * ru uses the same Latin paths as en (no Cyrillic in URLs).
 */
const PATHS_BY_LANG: Record<SupportedLng, Record<PageId, string>> = {
	en: enRoutes,
	de: deRoutes,
	ru: ruRoutes,
}

/**
 * Returns the path for a page in the given language.
 */
export function getPath(pageId: PageId, lng: SupportedLng): string {
	const pathsForLang = PATHS_BY_LANG[lng]
	const path = pathsForLang[pageId]

	return path
}

/**
 * Resolves pageId from a pathname.
 * Project detail URLs under /projects/:slug return 'projects'
 * so language switch stays on the projects area (list path for now).
 * Returns null when pathname does not match a known page.
 */
export function getPageIdFromPathname(pathname: string): PageId | null {
	const normalizedPathname = pathname.replace(/\/+$/, '') || '/'

	for (const pageId of PAGE_IDS) {
		const enPath = PATHS_BY_LANG.en[pageId]
		const dePath = PATHS_BY_LANG.de[pageId]
		const ruPath = PATHS_BY_LANG.ru[pageId]

		if (normalizedPathname === enPath) {
			return pageId
		}

		if (normalizedPathname === dePath) {
			return pageId
		}

		if (normalizedPathname === ruPath) {
			return pageId
		}
	}

	// Detail pages stay on English /projects/:slug for now
	if (normalizedPathname.startsWith('/projects/')) {
		return 'projects'
	}

	return null
}

/**
 * Builds the project detail URL. Always English prefix until admin slugs land.
 */
export function getProjectDetailPath(projectSlug: string): string {
	const detailPath = `/projects/${projectSlug}`

	return detailPath
}

/**
 * Picks a safe language for path helpers.
 */
export function resolvePathLang(lng: string): SupportedLng {
	if (lng === 'en' || lng === 'de' || lng === 'ru') {
		return lng
	}

	return DEFAULT_LANG
}

/**
 * If pathname is a German-only segment (differs from en), returns 'de'.
 * Otherwise null — en/ru share Latin paths and cannot be guessed from URL.
 */
export function getLangHintFromPathname(pathname: string): SupportedLng | null {
	const normalizedPathname = pathname.replace(/\/+$/, '') || '/'

	for (const pageId of PAGE_IDS) {
		const enPath = PATHS_BY_LANG.en[pageId]
		const dePath = PATHS_BY_LANG.de[pageId]

		if (normalizedPathname === dePath && dePath !== enPath) {
			return 'de'
		}
	}

	return null
}
