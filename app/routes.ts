import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/main-layout.tsx", [
    index("routes/HomePage/home-page.tsx"),
    
    route("skills", "routes/skills-page.tsx"),
    route("contacts", "routes/contacts-page.tsx"),
    
    // Секция проектов
    route("projects", "routes/projects-list-page.tsx"), 
    route("projects/:projectPath", "routes/project-details-page.tsx"),
  ]),
] satisfies RouteConfig;




// import { type RouteConfig, type RouteConfigEntry, index, layout, prefix, route } from '@react-router/dev/routes'
// import type { SupportedLng } from './lib/i18n'

// type MultiRouteMapperFunction = (path: string, language: string) => Array<RouteConfigEntry | Array<RouteConfigEntry>>

// /**
//  * convenience function to create routes for multiple languages
//  */
// function multiRoute(config: Record<SupportedLng, string>, mapper: MultiRouteMapperFunction): Array<RouteConfigEntry> {
//   const routes: Array<Array<RouteConfigEntry>> = []

//   for (const [language, path] of Object.entries(config)) {
//     routes.push(mapper(path, language).flat())
//   }

//   return routes.flat()
// }

// export default [
//   route('language', 'routes/language.tsx'),
//   layout(
//     'routes/auth/_layout.tsx',
//     [
//       multiRoute(
//         {
//           de: 'registrieren',
//           en: 'register',
//         },
//         (path, language) => [
//           route(path, 'routes/auth/register.tsx', {
//             id: `${language}.routes/auth/register.tsx`,
//           }),
//         ],
//       ),
//       multiRoute(
//         {
//           de: 'fast-geschafft',
//           en: 'almost-done',
//         },
//         (path, language) => [
//           route(path, 'routes/auth/register-success.tsx', {
//             id: `${language}.routes/auth/register-success.tsx`,
//           }),
//         ],
//       ),
//       multiRoute(
//         {
//           de: 'anmelden',
//           en: 'login',
//         },
//         (path, language) => [
//           route(path, 'routes/auth/login.tsx', {
//             id: `${language}.routes/auth/login.tsx`,
//           }),
//         ],
//       ),
//       multiRoute(
//         {
//           de: 'passwort-zuruecksetzen',
//           en: 'reset-password',
//         },
//         (path, language) => [
//           route(path, 'routes/auth/reset-password.tsx', {
//             id: `${language}.routes/auth/reset-password.tsx`,
//           }),
//         ],
//       ),
//       multiRoute(
//         {
//           de: 'abmelden',
//           en: 'logout',
//         },
//         (path, language) => [
//           route(path, 'routes/auth/logout.tsx', {
//             id: `${language}.routes/auth/logout.tsx`,
//           }),
//         ],
//       ),
//     ].flat(),
//   ),
//   layout(
//     'routes/_layout.tsx',
//     [
//       index('routes/_index.tsx'),

//       multiRoute(
//         {
//           de: 'impressum',
//           en: 'imprint',
//         },
//         (path, language) => [
//           route(path, 'routes/imprint.tsx', {
//             id: `${language}.routes/imprint.tsx`,
//           }),
//         ],
//       ),
//       multiRoute(
//         {
//           de: 'datenschutz',
//           en: 'privacy-policy',
//         },
//         (path, language) => [
//           route(path, 'routes/privacy-policy.tsx', {
//             id: `${language}.routes/privacy-policy.tsx`,
//           }),
//         ],
//       ),

//       multiRoute(
//         {
//           de: ':city?/veranstaltungen',
//           en: ':city?/events',
//         },
//         (path, language) => [
//           prefix(path, [
//             index('routes/event/overview.tsx', {
//               id: `${language}.routes/event/overview.tsx`,
//             }),
//           ]),
//           prefix(`:city?/${language === 'de' ? 'veranstaltung' : 'event'}`, [
//             route(':slug', 'routes/event/details.tsx', {
//               id: `${language}.routes/event/details.tsx`,
//             }),
//           ]),
//         ],
//       ),

//       multiRoute(
//         {
//           de: ':city?/gastronomien',
//           en: ':city?/gastronomies',
//         },
//         (path, language) => [
//           prefix(path, [
//             index('routes/gastronomy/overview.tsx', {
//               id: `${language}.routes/gastronomy/overview.tsx`,
//             }),
//           ]),
//           prefix(`:city?/${language === 'de' ? 'gastronomie' : 'gastronomy'}`, [
//             route(':slug', 'routes/gastronomy/details.tsx', {
//               id: `${language}.routes/gastronomy/details.tsx`,
//             }),
//           ]),
//         ],
//       ),

// также есть два файла переводов: 
// {
//   "/register": "/registrieren",
//   "/almost-done": "/fast-geschafft",
//   "/login": "/anmelden",
//   "/reset-password": "/passwort-zuruecksetzen",
//   "/logout": "/abmelden",

//   "/contact": "/kontakt",
//   "/faq": "/faq",

//   "/imprint": "/impressum",
//   "/privacy-policy": "/datenschutz",

//   "/:city?/events": "/:city?/veranstaltungen",
//   "/:city?/gastronomies": "/:city?/gastronomien",

//   "/:city?/event/:slug": "/:city?/veranstaltung/:slug",
//   "/:city?/gastronomy/:slug": "/:city?/gastronomie/:slug",

//   "/company/:slug": "/unternehmen/:slug",

//   "/profile": "/profil",
//   "/profile/favourites": "/profil/favoriten"
// }