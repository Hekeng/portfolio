
"use client";
import React from 'react'
import { cn } from '@/lib/utils'
import { context } from '../themeController/ThemeProvider'
import { Moon, Sun } from 'lucide-react'

interface DarkModeBtnProps {
	className?: string
}

const DarkModeBtn = ({ className }: DarkModeBtnProps) => {
	const { isDark, toggleTheme } = React.useContext(context)

	return (
		<button
			className={cn(
				[
					`before:duration-default before:ease-soft before:bg-background before:absolute before:top-[1px] before:left-[1px] before:block before:h-[2.4rem] before:w-[2.4rem] before:rounded-full before:transition-[left] before:content-[""]`,
				], // Базовый класс всегда тут
				isDark && 'dark-mode-btn--active before:left-[2.6rem]', // Условие: если true, добавит этот класс
				className
			)}
			onClick={toggleTheme}
		>
			<Sun className='' />
			<Moon className='' />
		</button>
	)
}

export default DarkModeBtn
