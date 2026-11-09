// Condado Digital: oculta archivos internos del repositorio que no son parte del sitio.
// Solo se ejecuta en las rutas listadas en /_routes.json; el resto del sitio es estático.
// Si agregas otro archivo interno al repositorio, súmalo aquí y en _routes.json.
const OCULTOS = new Set(["/README.md", "/.gitignore", "/_routes.json"]);

export async function onRequest(context) {
  const { pathname } = new URL(context.request.url);
  if (OCULTOS.has(pathname) || pathname.startsWith("/functions/")) {
    // Responde con la página 404 del sitio y código 404
    const pagina = await context.env.ASSETS.fetch(new URL("/404", context.request.url));
    return new Response(pagina.body, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }
  return context.next();
}
