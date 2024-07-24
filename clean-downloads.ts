import { $, Glob } from "bun";

const HOME = process.env.HOME;
const UNKNOWN_TYPES = `${HOME}/Documents/scripts/unknown-types.txt`;
const DOWNLOADS_DIR = `${HOME}/Downloads`;

const PACKAGES = `${DOWNLOADS_DIR}/packages`;
const packageTypeRegex = /application\/(x-debian-package|gzip|x-xz)/;

const IMAGES = `${DOWNLOADS_DIR}/images`;
const imageTypeRegex = /image\//;

const SHEETS = `${DOWNLOADS_DIR}/sheets`;
// accept either "text/csv" or "application/(anything that includes "excel" or "spreadsheet" or "sheet")"
const sheetTypeRegex = /text\/csv|(application\/.*(excel|spreadsheet|sheet).*)/;

const PDFS = `${DOWNLOADS_DIR}/pdfs`;
const pdfTypeRegex = /application\/pdf/;

const ZIPS = `${DOWNLOADS_DIR}/zips`;
const zipTypeRegex = /application\/zip/;

const AUDIO = `${DOWNLOADS_DIR}/audio`;
const audioTypeRegex = /audio\//;

const TRASH = `${HOME}/.local/share/Trash`;
const trashTypeRegex = /application\/octet-stream/;
// create the directories
await $`mkdir -p ${PACKAGES} ${IMAGES} ${SHEETS} ${PDFS} ${ZIPS} ${AUDIO}`;

const glob = new Glob(`${DOWNLOADS_DIR}/*`);

// read the downloads files and seperate them via their extension

for (const file of glob.scanSync(".")) {
  const f = Bun.file(file);
  const ext = f.type;
  if (ext.match(packageTypeRegex)) {
    await $`mv ${f} ${PACKAGES}`;
    continue;
  }
  if (ext.match(imageTypeRegex)) {
    await $`mv ${f} ${IMAGES}`;
    continue;
  }
  if (ext.match(sheetTypeRegex)) {
    await $`mv ${f} ${SHEETS}`;
    continue;
  }
  if (ext.match(pdfTypeRegex)) {
    await $`mv ${f} ${PDFS}`;
    continue;
  }
  if (ext.match(zipTypeRegex)) {
    await $`mv ${f} ${ZIPS}`;
    continue;
  }
  if (ext.match(audioTypeRegex)) {
    await $`mv ${f} ${AUDIO}`;
    continue;
  }
  if (ext.match(trashTypeRegex)) {
    await $`mv ${f} ${TRASH}`;
    continue;
  }
  // append the file type to the list of unknown types if it isn't already there
  await $`echo ${ext} >> ${UNKNOWN_TYPES + ": " + f.name}`;
}
