import {
	type RouteConfig,
	index,
	route,
	layout,
} from '@react-router/dev/routes'

export default [
	layout('routes/main-layout.tsx', [
		index('routes/HomePage/home-page.tsx'),

		// skills: same path for en/de/ru
		route('skills', 'routes/skills-page.tsx'),

		// contacts
		route('contacts', 'routes/contacts-page.tsx', {
			id: 'en.routes/contacts-page.tsx',
		}),
		route('kontakt', 'routes/contacts-page.tsx', {
			id: 'de.routes/contacts-page.tsx',
		}),

		// projects list (detail slug route stays English-only for now)
		route('projects', 'routes/projects-list-page.tsx', {
			id: 'en.routes/projects-list-page.tsx',
		}),
		route('projekte', 'routes/projects-list-page.tsx', {
			id: 'de.routes/projects-list-page.tsx',
		}),
		route('projects/:projectPath', 'routes/project-details-page.tsx'),
	]),
] satisfies RouteConfig
