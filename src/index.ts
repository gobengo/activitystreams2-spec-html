import { scrapeVocabulary } from "activitystreams2-spec-scraped"
import ntml from "lit-ntml"

async function main () {
  const as2Vocab = await scrapeVocabulary()
  const html = ntml()
  const rendered = await html`
    <!doctype html>
    <h1>ActivityStreams 2.0</h1>
    <p>Rendered from scraped owl:Ontology</p>
    <h2>Core Types</h2>
    <p>The Activity Vocabulary Core Types provide the basis for the rest of the vocabulary.</p>
    <p>Base URI: <code>https://www.w3.org/ns/activitystreams#</code>.</p>
    <p>The Activity Streams 2.0 Core Types include:</p>
    <ul>${
    as2Vocab.sections.coreTypes.members.map((coreTypeMember) => html`
      <li><a href="${coreTypeMember.url}">${coreTypeMember.name}</a></li>
    `)
    }</ul>
  `
  console.log(rendered)
}

if (require.main === module) {
  main().catch((e: Error) => {
    throw e;
  });
}
