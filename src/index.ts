import { scrapeVocabulary } from "activitystreams2-spec-scraped"

async function main () {
  const as2Vocab = await scrapeVocabulary()
  const html = `
    <!doctype html>
    <!-- @TODO render vocab to html -->
  `
  console.log(html)
}

if (require.main === module) {
  main().catch((e: Error) => {
    throw e;
  });
}
