import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	DEFAULT_LANG,
	isSupportedLang,
	saveStoredLang,
	SUPPORTED_LANGS,
	type SupportedLng,
} from '@/lib/i18n'
import {
	getPageIdFromPathname,
	getPath,
} from '@/lib/localizedPaths'

interface SwitchLanguageSelectProps {
	selectTriggerClassName: string
	selectValueClassName: string
	selectContentClassName: string
	selectItemClassName: string
}

const SwitchLanguageSelect = ({
	selectTriggerClassName,
	selectValueClassName,
	selectContentClassName,
	selectItemClassName,
}: SwitchLanguageSelectProps) => {
	const { i18n } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()

	const currentLang = useMemo(() => {
		const languageCode = i18n.language.slice(0, 2)

		if (isSupportedLang(languageCode)) {
			return languageCode
		}

		return DEFAULT_LANG
	}, [i18n.language])

	const handleValueChange = useCallback(
		(nextValue: string) => {
			if (!isSupportedLang(nextValue)) {
				return
			}

			const nextLang: SupportedLng = nextValue
			void i18n.changeLanguage(nextLang)
			saveStoredLang(nextLang)

			const pathname = location.pathname
			const isProjectDetail =
				pathname.startsWith('/projects/') && pathname !== '/projects'

			// Detail slugs are English-only for now — keep the same URL
			if (isProjectDetail) {
				return
			}

			const pageId = getPageIdFromPathname(pathname)

			if (!pageId) {
				return
			}

			const nextPath = getPath(pageId, nextLang)

			if (nextPath === pathname) {
				return
			}

			navigate(nextPath)
		},
		[i18n, location.pathname, navigate]
	)

	return (
		<Select value={currentLang} onValueChange={handleValueChange}>
			<SelectTrigger className={selectTriggerClassName}>
				<SelectValue
					placeholder={DEFAULT_LANG}
					className={selectValueClassName}
				/>
			</SelectTrigger>
			<SelectContent
				position='popper'
				align='end'
				className={selectContentClassName}
			>
				{SUPPORTED_LANGS.map((lang) => {
					return (
						<SelectItem
							key={lang}
							className={selectItemClassName}
							value={lang}
						>
							{lang}
						</SelectItem>
					)
				})}
			</SelectContent>
		</Select>
	)
}

export default SwitchLanguageSelect
