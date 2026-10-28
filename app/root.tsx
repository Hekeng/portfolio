import { useEffect, useMemo } from 'react'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLocation,
} from 'react-router'
import { I18nextProvider, useTranslation } from 'react-i18next'

import i18n, {
	DEFAULT_LANG,
	isSupportedLang,
	resolveInitialLang,
	saveStoredLang,
} from './lib/i18n'
import { getLangHintFromPathname } from './lib/localizedPaths'
import { ThemeProvider } from './components/themeController/ThemeProvider'
import './styles/fonts.css'
import './styles/index.css'

function Document() {
	const { i18n: i18nInstance } = useTranslation()
	const location = useLocation()

	const currentLang = useMemo(() => {
		const languageCode = i18nInstance.language.slice(0, 2)

		if (isSupportedLang(languageCode)) {
			return languageCode
		}

		return DEFAULT_LANG
	}, [i18nInstance.language])

	// German-only URLs force `de` (also on client navigations to /projekte, /kontakt)
	useEffect(() => {
		const pathLangHint = getLangHintFromPathname(location.pathname)

		if (!pathLangHint) {
			return
		}

		void i18nInstance.changeLanguage(pathLangHint)
		saveStoredLang(pathLangHint)
	}, [i18nInstance, location.pathname])

	// First visit: localStorage / browser language (skipped when URL already implies de)
	useEffect(() => {
		const pathLangHint = getLangHintFromPathname(location.pathname)

		if (pathLangHint) {
			return
		}

		const initialLang = resolveInitialLang()
		void i18nInstance.changeLanguage(initialLang)
		saveStoredLang(initialLang)
		// Intentionally run once on mount for storage/browser bootstrap
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [i18nInstance])

	return (
		<html lang={currentLang}>
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeProvider>
					<Outlet />
				</ThemeProvider>

				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<I18nextProvider i18n={i18n}>
			<Document />
		</I18nextProvider>
	)
}

export function ErrorBoundary({ error }: { error: unknown }) {
	let message = 'Oops!'
	let details = 'An unexpected error occurred.'
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error'
		details =
			error.status === 404
				? 'Страница не найдена.'
				: error.data?.message || details
	} else if (error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<main className='container mx-auto p-4 pt-16'>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className='w-full overflow-x-auto bg-slate-100 p-4'>
					<code>{stack}</code>
				</pre>
			)}
		</main>
	)
}
