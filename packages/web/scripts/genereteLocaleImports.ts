// @ts-ignore
import * as fs from "fs";
import { join } from "path";

let locales: string[] = [];

fs.readdirSync(join(__dirname, "../public/locales")).forEach((locale) => {
  locales.push(locale);
});

const s = `${locales.map((l) => `import 'dayjs/locale/${l}';`).join("\n")}`;

fs.writeFileSync(join(__dirname, "../src/generated/localeImports.ts"), s);
