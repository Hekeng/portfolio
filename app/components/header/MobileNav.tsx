import { useCallback, useMemo, useState } from 'react'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ChevronLeft } from 'lucide-react'

import { menuItems } from '../helpers/ProjectsList'
import { cn } from '@/lib/utils'
import { getPath, resolvePathLang } from '@/lib/localizedPaths'
import { Button } from '@/components/ui/button'
import { BurgerIcon } from '@/components/ui/Icons'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

const MobileNav = () => {
	const { t, i18n } = useTranslation('common')
	const [open, setOpen] = useState(false)

	const logoName = t('logo_name')
	const logoSuffix = t('logo_suffix')
	const openMenuLabel = t('a11y_open_menu')
	const closeMenuLabel = t('a11y_close_menu')

	const currentLang = useMemo(() => {
		const lang = resolvePathLang(i18n.language.slice(0, 2))
		return lang
	}, [i18n.language])

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

	const handleOpenChange = useCallback((nextOpen: boolean) => {
		setOpen(nextOpen)
	}, [])

	const handleLinkClick = useCallback(() => {
		setOpen(false)
	}, [])

	const getLinkClassName = useCallback(
		({ isActive }: { isActive: boolean }) => {
			const baseClassName =
				'hover:text-primary/80 duration-base ease-soft relative block w-fit transition-colors'

			if (isActive) {
				const activeClassName =
					'before:bg-accent-foreground before:absolute before:top-full before:left-0 before:mt-[0.2rem] before:block before:h-[0.15rem] before:w-full before:rounded-full'

				return cn(baseClassName, activeClassName)
			}

			return cn(baseClassName)
		},
		[]
	)

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetTrigger asChild>
				<button
					type='button'
					className='bg-foreground text-primary duration-base ease-soft flex h-[2.6rem] w-[5.1rem] shrink-0 cursor-pointer items-center justify-center rounded-full transition-all hover:-translate-y-[0.1rem] active:translate-y-0 sm:hidden'
					aria-label={openMenuLabel}
				>
					<BurgerIcon />
				</button>
			</SheetTrigger>

			{/* w-fit: panel hugs content; rest of viewport stays on the dimmed overlay */}
			<SheetContent
				side='left'
				showCloseButton={false}
				className='bg-background text-primary w-fit max-w-[90vw] gap-0 p-0 sm:max-w-none'
			>
				<SheetHeader className='border-border flex-row items-center justify-between gap-[1.6rem] border-b px-[1.6rem] py-[1.2rem] pr-[1.2rem]'>
					<SheetTitle className='text-primary text-[1.6rem] font-medium whitespace-nowrap'>
						<strong className='font-bold'>{logoName}</strong>{' '}
						{logoSuffix}
					</SheetTitle>
					<SheetClose asChild>
						<Button
							type='button'
							variant='default'
							size='icon'
							aria-label={closeMenuLabel}
							className='duration-base ease-soft h-[2.6rem] w-[2.6rem] shrink-0 rounded-md border-none p-0 hover:-translate-y-[0.1rem] active:translate-y-0 [&_svg]:size-[1.2rem] [&_svg]:-translate-x-[0.1rem]'
						>
							{/* Optical center: ChevronLeft glyph sits slightly right in its viewBox */}
							<ChevronLeft strokeWidth={2} />
						</Button>
					</SheetClose>
				</SheetHeader>

				<nav className='px-[1.6rem] py-[2rem] pr-[2rem]'>
					<ul className='font-poppins flex flex-col gap-[1.6rem] text-[1.8rem] font-medium'>
						{translatedMenuItems.map((menuItem) => {
							return (
								<li key={menuItem.labelKey}>
									<NavLink
										to={menuItem.path}
										onClick={handleLinkClick}
										className={getLinkClassName}
									>
										{menuItem.label}
									</NavLink>
								</li>
							)
						})}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	)
}

export default MobileNav
