import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import DownloadButton from '../downloadButton'
import HeroBackground from '../ui/HeroBackground'

const Hero = () => {
	const { t } = useTranslation('common')

	const greeting = t('hero_greeting')
	const name = t('hero_name')
	const role = t('hero_role')
	const subtitle = t('hero_subtitle')
	const downloadText = t('button_download')

	const titleNode = useMemo(() => {
		return (
			<>
				<strong className='text-[6rem] font-bold'>
					{greeting}{' '}
					<em className='text-primary not-italic'>{name}</em>
				</strong>
				<br />
				{role}
			</>
		)
	}, [greeting, name, role])

	return (
		<div className='header bg-foreground text-background flex items-center justify-center bg-auto bg-center bg-no-repeat py-[4rem] text-center'>
			<div className='header__wrapper max-w-[66rem] px-[1.5rem]'>
				<HeroBackground className='text-background z-[10] opacity-20' />

				<h1 className='header__title text-h1 z-[800] mb-[2rem] leading-[1.4] font-bold'>
					{titleNode}
				</h1>
				<div className='header__text mb-[4rem] space-y-[0.5em] text-[2rem] leading-[1.333]'>
					<p>{subtitle}</p>
				</div>
				<DownloadButton url='/cv.pdf' text={downloadText} />
			</div>
		</div>
	)
}

export default Hero
