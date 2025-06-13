import { resolve } from "path";
import { glob } from "glob";

const medias = await glob(resolve(import.meta.dirname, "./**/index.ts"));

const providers = [];
for await (const url of medias) {
  const { default: hook, Priority } = await import(url);
  providers.push({
    hook,
    Priority,
  });
}

providers.sort((a, b) => b.Priority - a.Priority);

export const fetchMetaData = () => {};
