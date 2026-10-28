import { useMemo } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import NavItem from './HeaderItem'
import { menuItems } from '../helpers/ProjectsList'
import DarkModeBtn from '../darkModeBtn/DarkModeBtn'
import { cn } from '@/lib/utils'
import { getPath, resolvePathLang } from '@/lib/localizedPaths'
import SwitchLanguageSelect from '../switchLanguageSelect/switchLanguageSelect'
import MobileNav from './MobileNav'

interface headerProps {
	className: string
}

const switchTriggerClassName =
	'h-[2.6rem] w-[5.1rem] shrink-0 justify-center gap-[0.2rem] rounded-full border-none bg-foreground p-0 px-[0.8rem] text-[1.6rem] text-primary focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:size-[1em] [&_svg]:shrink-0'

const switchValueClassName =
	'inline-block w-[2ch] shrink-0 text-center text-primary'

const switchContentClassName =
	'z-[1100] w-auto min-w-0 rounded-[0.6rem] border border-border bg-secondary text-primary shadow-md data-[side=bottom]:min-w-0 [&_[data-radix-select-viewport]]:min-w-0 [&_[data-radix-select-viewport]]:w-auto'

const switchItemClassName =
	'gap-[0.4rem] px-[0.4rem] py-[0.4rem] text-[1.4rem] font-medium text-primary focus:bg-accent focus:text-primary data-[highlighted]:bg-accent data-[highlighted]:text-primary'

export const Header = ({ className }: headerProps) => {
	const { t, i18n } = useTranslation('common')

	const logoName = t('logo_name')
	const logoSuffix = t('logo_suffix')

	const currentLang = useMemo(() => {
		const lang = resolvePathLang(i18n.language.slice(0, 2))
		return lang
	}, [i18n.language])

	const homePath = useMemo(() => {
		const path = getPath('home', currentLang)
		return path
	}, [currentLang])

	const translatedMenuItems = useMemo(() => {
		const items = menuItems.map((menuItem) => {
			const label = t(menuItem.labelKey)
			const path = getPath(menuItem.pageId, currentLang)

			return {
				pageId: menuItem.pageId,
				path: path,
				label: label,
				labelKey: menuItem.labelKey,
			}
		})

		return items
	}, [t, currentLang])

	return (
		<header className={cn([`nav`, className])}>
			{/*
			  Mobile (<640px / sm): burger left, switches right (scheme B).
			  Desktop: logo + nav + switches, nowrap — text scales via clamp.
			*/}
			<div className='nav-row flex w-full flex-nowrap items-center justify-between gap-x-[clamp(1rem,2vw,3rem)] sm:justify-end'>
				<MobileNav />

				<Link
					to={homePath}
					className='logo text-primary hover:text-primary/80 active:text-primary duration-base ease-soft mr-auto hidden shrink text-[clamp(1.6rem,2.2vw,2.5rem)] whitespace-nowrap transition-all hover:-translate-y-[0.2rem] active:translate-y-0 sm:inline'
				>
					<strong className='font-bold'>{logoName}</strong> {logoSuffix}
				</Link>

				<ul className='nav-list text-primary font-poppins hidden flex-nowrap items-center gap-x-[clamp(0.6rem,1.2vw,1rem)] text-[clamp(1.4rem,1.7vw,1.8rem)] font-medium whitespace-nowrap sm:flex'>
					{translatedMenuItems.map((menuItem) => {
						return (
							<NavItem key={menuItem.labelKey} to={menuItem.path}>
								{menuItem.label}
							</NavItem>
						)
					})}
				</ul>

				<div className='switchContainer flex shrink-0 items-center gap-[0.5rem]'>
					<DarkModeBtn className='dark-mode-btn bg-foreground relative flex h-[2.6rem] w-[5.1rem] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[5rem] p-[0.6rem]' />
					<SwitchLanguageSelect
						selectTriggerClassName={switchTriggerClassName}
						selectValueClassName={switchValueClassName}
						selectContentClassName={switchContentClassName}
						selectItemClassName={switchItemClassName}
					/>
				</div>
			</div>
		</header>
	)
}
