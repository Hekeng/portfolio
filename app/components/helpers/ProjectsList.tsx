import type { PageId } from '@/lib/localizedPaths'

import project01 from '@/assets/img/projects/01.jpg'
import project01Big from '@/assets/img/projects/01-big.jpg'

import project02 from '@/assets/img/projects/02.jpg'
import project02Big from '@/assets/img/projects/02-big.jpg'

import project03 from '@/assets/img/projects/03.jpg'
import project03Big from '@/assets/img/projects/03-big.jpg'

import project04 from '@/assets/img/projects/04.jpg'
import project04Big from '@/assets/img/projects/04-big.jpg'

import project05 from '@/assets/img/projects/05.jpg'
import project05Big from '@/assets/img/projects/05-big.jpg'

import project06 from '@/assets/img/projects/06.jpg'
import project06Big from '@/assets/img/projects/06-big.jpg'

const projectsData = [
	{
		id: '01',
		title: 'Gaming streaming portal',
		path: 'gaming_streaming_portal',
		skills: 'React, Node.js, MongoDB',
		img: project01,
		bigImg: project01Big,
		gitHub: '',
	},
	{
		id: '02',
		title: 'Video service',
		path: 'video_service',
		skills: 'React, Node.js, MongoDB',
		img: project02,
		bigImg: project02Big,
		gitHub: '',
	},
	{
		id: '03',
		title: 'Video portal',
		path: 'video_portal',
		skills: 'React, Node.js, MongoDB',
		img: project03,
		bigImg: project03Big,
		gitHub: '',
	},
	{
		id: '04',
		title: 'Dating app',
		path: 'dating_app',
		skills: 'React, Node.js, MongoDB',
		img: project04,
		bigImg: project04Big,
		gitHub: '',
	},
	{
		id: '05',
		title: 'Landing',
		path: 'landing',
		skills: 'React, Node.js, MongoDB',
		img: project05,
		bigImg: project05Big,
		gitHub: '',
	},
	{
		id: '06',
		title: 'Gaming community',
		path: 'gaming_community',
		skills: 'React, Node.js, MongoDB',
		img: project06,
		bigImg: project06Big,
		gitHub: '',
	},
]

type MenuItem = {
	pageId: PageId
	labelKey: string
}

const menuItems: Array<MenuItem> = [
	{ pageId: 'home', labelKey: 'menu_home' },
	{ pageId: 'projects', labelKey: 'menu_projects' },
	{ pageId: 'contacts', labelKey: 'menu_contacts' },
	{ pageId: 'skills', labelKey: 'menu_skills' },
]

const Skills = [
	{
		skillName: 'JavaScript',
		skillImg: '',
	},
	{
		skillName: 'React',
		skillImg: '',
	},
	{
		skillName: 'Node.js',
		skillImg: '',
	},
	{
		skillName: 'MongoDB',
		skillImg: '',
	},
	{
		skillName: 'TypeScript',
		skillImg: '',
	},
	{
		skillName: 'Php',
		skillImg: '',
	},
	{
		skillName: 'Laravel',
		skillImg: '',
	},
	{
		skillName: 'CSS3',
		skillImg: '',
	},
	{
		skillName: 'Tailwindcss',
		skillImg: '',
	},
]

// const SkillName = {

//     JS: 'JavaScript',
// 	REACT: 'React',
//     NODE: 'Node.js',
//     MONGO: 'MongoDB',
//     TS: 'TypeScript',
// 	PHP: 'Php',
// 	Lara: 'Laravel',
//     CSS: 'CSS3',
// 	TAIL: 'Tailwindcss'

// } as const;

export { projectsData, menuItems, Skills }
