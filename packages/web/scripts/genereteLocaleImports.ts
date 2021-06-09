// @ts-ignore
import * as fs from "fs";
import { join } from "path";

let locales: string[] = [];

fs.readdirSync(join(__dirname, "../public/locales")).forEach((locale) => {
  locales.push(locale);
});

const localeImports = `${locales
  .map((l) => `import 'dayjs/locale/${l}';`)
  .join("\n")}`;
const localesObject = `export const allLocales = [\n${locales
  .map((l) => `\t"${l}",`)
  .join("\n")}\n]`;

const s = `${localeImports}\n\n${localesObject}`;

fs.writeFileSync(join(__dirname, "../src/generated/localeImports.ts"), s);
