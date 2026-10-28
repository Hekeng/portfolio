// import Header from '../components/hero/Hero'
import Project from '../components/project/Project'
import { projectsData } from '../components/helpers/ProjectsList'
import { cn } from '@/lib/utils'
import { getProjectDetailPath } from '@/lib/localizedPaths'

export default function ProjectsPage() {
	return (
		<main className='section'>
			<h2 className='title-1 text-h2 p-[2rem] text-center font-bold'>
				Projects
			</h2>
			<ul className='projects flex flex-wrap justify-center gap-x-[3rem] gap-y-[2rem] px-[2rem] py-[2rem]'>
				{projectsData.map((projectData) => {
					const detailPath = getProjectDetailPath(projectData.path)

					return (
						<Project
							key={projectData.id}
							title={projectData.title}
							img={projectData.img}
							path={detailPath}
							className={cn([
								'project bg-accent-foreground text-card max-w-[37rem] rounded-[1rem]',
								'hover:text-primary/80 active:text-primary duration-base ease-soft transition-all hover:-translate-y-[0.2rem] active:translate-y-0',
							])}
						/>
					)
				})}
			</ul>
		</main>
	)
}


