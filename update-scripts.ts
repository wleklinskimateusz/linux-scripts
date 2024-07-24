import { $, Glob } from "bun";

const HOME = process.env.HOME;
const ALIASES = `${HOME}/.bash_aliases`;

await $`sed -i '/# SCRIPTS START/,/# SCRIPTS END/d' ${ALIASES}`;

await $`echo "# SCRIPTS START" >> ${ALIASES}`;

const glob = new Glob(`${HOME}/Documents/scripts/*`);

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
