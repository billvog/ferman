// @ts-ignore
import * as fs from "fs";
import { join } from "path";
import prettier from "prettier";

let locales: string[] = [];

fs.readdirSync(join(__dirname, "../src/localization/locales")).forEach(
  (locale) => {
    locales.push(locale);
  }
);

const localeImports = `${locales
  .map((l) => `import 'dayjs/locale/${l}';`)
  .join("\n")}`;
const localesObject = `export const allLocales = [${locales
  .map((l) => `"${l}",`)
  .join("\n")}]`;

const s = `${localeImports}\n${localesObject}`;

fs.writeFileSync(
  join(__dirname, "../src/generated/localeImports.ts"),
  prettier.format(s, { parser: "babel", useTabs: true })
);
