import { cn } from '@/lib/utils'

interface SkillCardProps {
	title: string
	img: string
	className?: string
}

const SkillCard = ({ title, img, className }: SkillCardProps) => {
	return (
		<li className={cn('project', className)}>
			<img src={img} alt={title} className='project__img' />
			<h3 className='project__title'>{title}</h3>
		</li>
	)
}

export default SkillCard
