import { $, Glob } from "bun";
import { join } from "path";

const HOME = process.env.HOME;
const ALIASES = `${HOME}/.bash_aliases`;
// create aliases file if it doesn't exist
await $`touch ${ALIASES}`;

await $`sed -i '/# SCRIPTS START/,/# SCRIPTS END/d' ${ALIASES}`;

await $`echo "# SCRIPTS START" >> ${ALIASES}`;

const glob = new Glob(join(import.meta.dir, "*"));

for (const f of glob.scanSync(".")) {
  if (!f.endsWith(".ts")) {
    continue;
  }
  await $`echo alias ${f
    .split("/")
    .pop()
    ?.replace(".ts", "")}=\"bun ${f}\" >> ${ALIASES}`;
}

await $`echo "# SCRIPTS END" >> ${ALIASES}`;
