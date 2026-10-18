import { cn } from '@/lib/utils'
import { NavLink } from 'react-router'

type NavItemProps = {
	to: string
	children: React.ReactNode
}

const HeaderItem = ({ to, children }: NavItemProps) => (
	<li className='nav-list__item text-primary hover:text-primary/80 active:text-primary duration-base ease-soft transition-all hover:-translate-y-[0.2rem] active:translate-y-0'>
		<NavLink
			to={to}
			className={({ isActive }) =>
				cn([
					'nav-list__link duration-default ease-soft transition-opacity hover:opacity-80',
					isActive &&
						'nav-list__link--active before:bg-accent-foreground relative before:absolute before:top-full before:left-0 before:block before:h-[0.15rem] before:w-full before:rounded-full',
					' ',
				])
			}
		>
			{children}
		</NavLink>
	</li>
)

export default HeaderItem
