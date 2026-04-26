import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SignalOps — Revenue Intelligence Platform" },
      { name: "description", content: "Six AI agents working 24/7 to protect your revenue, close your deals and find your next best customers." },
      { property: "og:title", content: "SignalOps — Revenue Intelligence Platform" },
      { property: "og:description", content: "Six AI agents working 24/7 to protect your revenue, close your deals and find your next best customers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
