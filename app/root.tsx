import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import { ThemeProvider } from "./components/themeController/ThemeProvider";
import "./styles/fonts.css"
import "./styles/index.css"

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
           <Outlet />
        </ThemeProvider>
        
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
import { isRouteErrorResponse } from "react-router";

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  // Если это ошибка роутера (например, 404)
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "Страница не найдена."
        : error.data?.message || details;
  } 
  // Если это обычная ошибка JS (ошибка в коде)
  else if (error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4 bg-slate-100">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}