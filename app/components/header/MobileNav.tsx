import { useState } from 'react'
import { NavLink } from 'react-router'
import { ChevronLeft } from 'lucide-react'

import { menuItems } from '../helpers/ProjectsList'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

/** Solid bars — sharper than Lucide stroke at small rem sizes */
const BurgerIcon = () => (
	<span
		aria-hidden
		className='flex flex-col items-center justify-center gap-[0.32rem]'
	>
		{/* Thickness: change h-[…] on each bar (keep all three equal) */}
		<span className='bg-primary block h-[0.22rem] w-[1.35rem] rounded-full' />
		<span className='bg-primary block h-[0.22rem] w-[1.35rem] rounded-full' />
		<span className='bg-primary block h-[0.22rem] w-[1.35rem] rounded-full' />
	</span>
)

const MobileNav = () => {
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<button
					type='button'
					className='bg-foreground text-primary duration-base ease-soft flex h-[2.6rem] w-[5.1rem] shrink-0 cursor-pointer items-center justify-center rounded-full transition-all hover:-translate-y-[0.1rem] active:translate-y-0 sm:hidden'
					aria-label='Open menu'
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
				<SheetHeader className='flex-row items-center justify-between gap-[1.6rem] border-b border-border px-[1.6rem] py-[1.2rem] pr-[1.2rem]'>
					<SheetTitle className='text-primary text-[1.6rem] font-medium whitespace-nowrap'>
						<strong className='font-bold'>Deweloper</strong> portfolio
					</SheetTitle>
					<SheetClose asChild>
						<Button
							type='button'
							variant='default'
							size='icon'
							aria-label='Close menu'
							className='duration-base ease-soft h-[2.6rem] w-[2.6rem] shrink-0 rounded-md border-none p-0 hover:-translate-y-[0.1rem] active:translate-y-0 [&_svg]:size-[1.2rem] [&_svg]:-translate-x-[0.1rem]'
						>
							{/* Optical center: ChevronLeft glyph sits slightly right in its viewBox */}
							<ChevronLeft strokeWidth={2} />
						</Button>
					</SheetClose>
				</SheetHeader>

				<nav className='px-[1.6rem] py-[2rem] pr-[2rem]'>
					<ul className='font-poppins flex flex-col gap-[1.6rem] text-[1.8rem] font-medium'>
						{menuItems.map((menuItem) => (
							<li key={menuItem.label}>
								<NavLink
									to={menuItem.path}
									onClick={() => setOpen(false)}
									className={({ isActive }) =>
										cn(
											'hover:text-primary/80 duration-base ease-soft relative block w-fit transition-colors',
											isActive &&
												'before:bg-accent-foreground before:absolute before:top-full before:left-0 before:mt-[0.2rem] before:block before:h-[0.15rem] before:w-full before:rounded-full'
										)
									}
								>
									{menuItem.label}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	)
}

export default MobileNav
