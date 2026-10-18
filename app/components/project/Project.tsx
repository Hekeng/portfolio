import { cn } from '@/lib/utils'
import { Link } from 'react-router'
// import { projectsData } from '@/components/healpers/ProjectsList'
// import './projectStyle.css'

interface ProjectProps {
	title: string
	img: string
	path: string
	className?: string
}

const Projects = ({ title, img, path, className }: ProjectProps) => {
	return (
		<li className={cn(`${className} `)}>
			<Link to={path}>
				<img
					src={img}
					alt='Project img'
					className='project__img rounded-[1rem]'
				/>
				<h3 className='project__title text-h5 p-[2rem] text-center font-bold '>
					{title}
				</h3>
			</Link>
		</li>
	)
}

export default Projects
