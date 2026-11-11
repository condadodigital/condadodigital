// Genera public/conde-terminos.json a partir de public/glosario.html.
// Uso (desde la raíz del repositorio): node herramientas/generar-conde-terminos.mjs
// Vuelve a ejecutarlo cada vez que cambie el glosario y publica los dos archivos juntos.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(raiz, "public", "glosario.html"), "utf8");

const entidades = { amp: "&", lt: "<", gt: ">", quot: '"', "#x27": "'", "#39": "'", nbsp: " " };
const texto = (s) => (s || "")
  .replace(/<[^>]+>/g, "")
  .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => {
    if (entidades[e.toLowerCase()] !== undefined) return entidades[e.toLowerCase()];
    if (e[0] === "#") return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return m;
  })
  .replace(/\s+/g, " ")
  .trim();
const attr = (tag, nombre) => { const m = tag.match(new RegExp(nombre + '="([^"]*)"')); return m ? texto(m[1]) : ""; };
const parte = (li, re) => { const m = li.match(re); return m ? texto(m[1]) : ""; };

// Formato compacto: [id, término, nombre completo, definición, calculadora, ficha publicada (1/0), tema]
const terminos = [];
const reLi = /<li\b([^>]*\bclass="gt"[^>]*)>([\s\S]*?)<\/li>/g;
let m;
while ((m = reLi.exec(html))) {
  const [, tag, cuerpo] = m;
  terminos.push([
    attr(tag, "id"),
    parte(cuerpo, /<h4 class="gt-code">([\s\S]*?)<\/h4>/),
    parte(cuerpo, /<p class="gt-full">([\s\S]*?)<\/p>/),
    parte(cuerpo, /<p class="gt-def">([\s\S]*?)<\/p>/),
    attr(tag, "data-calc"),
    attr(tag, "data-pub") === "1" ? 1 : 0,
    attr(tag, "data-tema"),
  ]);
}

const vacios = terminos.filter((t) => !t[0] || !t[1] || !t[3] || !t[6]);
if (!terminos.length || vacios.length) {
  console.error("Revisa glosario.html: " + (terminos.length ? vacios.length + " términos incompletos" : "no encontré ningún <li class=\"gt\">"));
  process.exit(1);
}
writeFileSync(join(raiz, "public", "conde-terminos.json"), JSON.stringify(terminos));
console.log("public/conde-terminos.json: " + terminos.length + " términos");
