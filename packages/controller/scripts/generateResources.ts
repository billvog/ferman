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

const imports = locales
  .map(
    (l) => `import ${l} from '../localization/locales/${l}/translation.json'`
  )
  .join("\n");

const object = `export const i18nLocaleResources = {${locales
  .map((l) => `'${l}': {translation: ${l}},`)
  .join("\n")}}`;

const s = `${imports}\n${object}`;

fs.writeFileSync(
  join(__dirname, "../src/generated/i18nResources.ts"),
  prettier.format(s, { parser: "babel", useTabs: true })
);
