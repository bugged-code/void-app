import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Solo proteger dashboard
  if (pathname.startsWith("/dashboard")) {
    const cookie = context.request.headers.get("cookie");

    const res = await fetch("http://localhost:8000/auth/profile", {
      headers: {
        cookie: cookie ?? "",
      },
    });

    if (!res.ok) {
      return context.redirect("/login");
    }
  }

  return next();
});
