// Mimang (Mising weaving patterns) — for the /learn/mimang page.
//
// HOW THIS WORKS NOW
// Each pattern is its own JSON file in content/mimang/, e.g.
// content/mimang/0001.json. This file just collects all of them into the
// same mimangData array shape the page always used — so Mimang.jsx and
// everything else that imports { mimangData } needs no changes.
//
// You can add a new pattern two ways:
//   1. Through the CMS at /admin (once set up) — adds/edits the JSON
//      files for you, including image uploads.
//   2. By hand — copy content/mimang/0001.json to content/mimang/0002.json
//      and edit it directly. Either way works; the CMS is optional.
//
// FIELD REFERENCE (same as before)
// code          4-digit id, e.g. '0001'
// gamigName     the pattern's name (e.g. 'Dora punjer')
// englishDesc   short English description, or null until written
// image         root-relative path to a 1:1 pattern image, or null
// clothExample  root-relative path to a cloth-example photo, or null

const modules = import.meta.glob('/content/mimang/*.json', { eager: true })

export const mimangData = Object.values(modules)
  .map((mod) => mod.default || mod)
  .sort((a, b) => a.code.localeCompare(b.code))