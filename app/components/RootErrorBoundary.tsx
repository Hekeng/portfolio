// import { useTranslation } from 'react-i18next'
// import { isRouteErrorResponse, useRouteLoaderData } from 'react-router'

// export function ErrorBoundary({ error }: { error: unknown }) {
//   const { t } = useTranslation()
//   const rootData = useRouteLoaderData('root') as any

//   const status = isRouteErrorResponse(error) ? error.status : 500
//   const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined
//   const title = t([`${status}_title`, '500_title'], {
//     defaultValue: status === 404 ? 'Page Not Found' : 'Error',
//   })

//   const details = t([`${status}_details`, '500_details'], {
//     defaultValue: 'An unexpected error occurred.',
//   })

//   return (
//     // Используем опциональную цепочку ?. для безопасности
//     <html lang={rootData?.locale || 'en'}>
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//         <title>{title}</title>
//       </head>
//       <body>
//         <header>
//           <a href="/">
//             <img src="/logo.svg" alt="Logo" />
//             <div>
//               <strong>cityhub</strong>
//               <span>Cuxhaven</span>
//             </div>
//           </a>
//         </header>

//         <main>
//           <img src="/logo.png" alt="Error Illustration" className="error-img" />
//           <h1>{title}</h1>
//           <p>{details}</p>

//           {stack && (
//             <pre>
//               <code>{stack}</code>
//             </pre>
//           )}

//           <div>
//             <a href="/">{t('button_home', { defaultValue: 'Back to Home' })}</a>
//             <br />
//             <a href="." onClick={() => window.location.reload()}>
//               {t('button_retry', { defaultValue: 'Try Again' })}
//             </a>
//           </div>
//         </main>

//         <footer>©CityHub {new Date().getFullYear()}</footer>

//         {/* Это КРИТИЧЕСКИ ВАЖНО, чтобы не было "got: undefined" */}
//         <Scripts />
//       </body>
//     </html>
//   )
// }

import { useTranslation } from 'react-i18next'
import { isRouteErrorResponse, useRouteLoaderData } from 'react-router'

interface ErrorInfo {
  title: string
  details: string
}

const ERROR_MAP: Record<number, ErrorInfo> = {
  400: { title: '400: Bad request', details: 'The request could not be processed.' },
  404: {
    title: '404: Page not found',
    details: 'Sorry, the page you are looking for does not exist or has been moved.',
  },
  500: { title: '500: Internal server error', details: "We've encountered an issue and are working to fix it." },
}

function getErrorContent(error: unknown): ErrorInfo {
  if (isRouteErrorResponse(error)) {
    return ERROR_MAP[error.status] || ERROR_MAP[500]
  }
  if (error instanceof Error) {
    return { title: 'Application Error', details: error.message }
  }
  return ERROR_MAP[500]
}

export function RootErrorBoundary({ error }: { error: unknown }) {

  const rootData = useRouteLoaderData('root') as any
  const isCrashedBadly = !rootData || !rootData.locale
  const { t } = useTranslation()

  let { title, details } = getErrorContent(error)
  let stack: string | undefined

  if (import.meta.env.DEV && error instanceof Error) {
    stack = error.stack
  }

  if (!isCrashedBadly) {
    const status = isRouteErrorResponse(error) ? error.status : 500
    title = t(`${status}_title`, { defaultValue: title })
    details = t(`${status}_details`, { defaultValue: details })
  }

  if (isCrashedBadly) {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            {`
              body{
                margin: 0;
                font-family:system-ui,sans-serif;
                display:flex;
                flex-direction: column;
                min-height: 100vh;
              }
              header {
                position: sticky;
                top: 0;
                height: 4rem;
                padding: 0.5rem 1rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                width: 100%;
                box-sizing: border-box;
              }
              header a {
                display: flex;
                flex-direction: row;
                gap: 0.5rem;
                max-width: max-content;
                text-decoration: none;
                color: inherit;
                margin: 0;
                padding: 0;
                background: transparent;
                border: none;
              }
              header img {
                height: 2.75rem;
                object-position: left;
              }
              header a div {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
              }
              header strong {
                color: var(--primary);
                font-size: 1.125rem;
                line-height: 1;
              }
              header span {
                font-size: 0.75rem;
                line-height: 1;
              }
              main {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                max-width: 50rem;
                min-width: 10rem;
                margin: 0 auto;
                padding: 1rem;
              }
              h1 {
                font-size: clamp(1.5rem, 5vh, 2rem);
                margin: 1rem 0;
              }
              p {
                font-size: clamp(1rem, 2vmin, 1.25rem);
                margin-bottom: 2rem;
                max-width:25rem;
              }
              img{
                max-width:100%;
                max-height: 30vh;
                height:auto;
                display:block;
              }
              pre{
                text-align:left;
                overflow:auto;
              }
              a{
                display:inline-block;
                margin-top: clamp(0.8rem, 2vw, 1.2rem);
                padding: clamp(0.1rem, 1vh, 0.4rem) clamp(0.8rem, 2vw, 1.2rem);
                font-size: clamp(0.875rem, 1.5vh, 1rem);
                border-radius:0.6rem;
                color:white;
                font-weight:600;
                border:1px solid #ccc;
                background:#be1622;
              }
              a:hover{
                opacity:.85;
              }
              footer {
                width: 100%;
                padding: 1.5rem;
                text-align: center;
                box-sizing: border-box;
                background:#3c3c3b;
                color:white;
              }
          `}
          </style>
          <title>{title}</title>
        </head>
        <body>
          <header>
            <a href="/">
              <img src="/logo.svg" alt="Logo" />
              <div>
                <strong>cityhub</strong>
                <span>Cuxhaven</span>
              </div>
            </a>
          </header>
          <main>
            <img src="/logo.png" alt="Error Illustration" className="error-img" />
            <h1>{title}</h1>
            <p>{details}</p>
            {stack && (
              <pre>
                <code>{stack}</code>
              </pre>
            )}
            <div>
              <a href="/">{t('button_home') !== 'button_home' ? t('button_home') : 'Back to Home'}</a>
              <br />
              <a href=".">{t('button_retry') !== 'button_retry' ? t('button_retry') : 'Try Again'}</a>
            </div>
          </main>
          <footer>©CityHub {new Date().getFullYear()}</footer>
        </body>
      </html>
    )
  }
  return (
    <main>
      <h1>{title}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
