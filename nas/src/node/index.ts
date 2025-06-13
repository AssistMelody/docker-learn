import figlet from "figlet";
import { H3, serve } from "h3";
import { readdir, readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { schedule } from "node-cron";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { fetchMetaData } from "./provides/entry";
import { MEDIAS_PATH } from "./utils";

const app = new H3({
  onRequest: (event) => {
    console.log("Request:", event.req.url);
  },
  onResponse: async (response, event) => {
    console.log("Response:", await response.clone().json());
  },
  onError: (error, event) => {
    console.error(error);
  },
});

app.get("/", (event) => ({ hello: "world" }));

serve(app, { port: 3000 });

if (process.env.CORN) {
  console.log("start", process.env.CORN, MEDIAS_PATH);

  const task = schedule(
    process.env.CORN,
    async () => {
      const item = await readdir(MEDIAS_PATH);
      console.log(new Date().toTimeString(), item);
    },
    {
      noOverlap: true,
    }
  );
  task.execute();
}

// const parse = new XMLParser();
// const xmlcontent = await readFile(
//   resolve(process.cwd(), "../../emby/media", `test.nfo`),
// );

// const obj = parse.parse(xmlcontent);
// console.log(obj);
// obj.Date = new Date().toString();

// const build = new XMLBuilder();

// const content = build.build(obj);
// await writeFile(
//   resolve(process.cwd(), "../../emby/media", `test.nfo`),
//   content,
// );
fetchMetaData();
