import {
  scrapeVocabulary,
  IOntology,
  ParsedClass,
  Property
} from "activitystreams2-spec-scraped";
import ntml from "lit-ntml";

interface Named {
  name: string;
}

const html = ntml();

const renderOntologyMember = (parsedClass: ParsedClass | Property) => html`
  <a href="${parsedClass.url}">${parsedClass.name}</a> - ${parsedClass.notes}
`;

const renderOntologyDefinitions = (
  ontology: IOntology<ParsedClass | Property>
) => html`
  <dl>
  ${ontology.members.map(
    member => html`
    <dt><a href="${member.url}">${member.name}</a></dt>
    <dd>${member.notes}</dd>
  `
  )}
  </dl>
`;

async function main() {
  const as2Vocab = await scrapeVocabulary();
  // @TODO(bengo.is) Add 'name' property to actual data graph so all this is unnecessary
  const ontologiesOfTypes: Array<IOntology<ParsedClass> & Named> = [
    { name: "Core Types", ...as2Vocab.sections.coreTypes },
    { name: "Activity Types", ...as2Vocab.sections.activityTypes },
    { name: "Actor Types", ...as2Vocab.sections.actorTypes },
    { name: "Object And Link Types", ...as2Vocab.sections.objectTypes }
  ];
  const ontologiesOfProperties: Array<IOntology<Property> & Named> = [
    { name: "Properties", ...as2Vocab.sections.properties }
  ];
  const ontologies = [...ontologiesOfTypes, ...ontologiesOfProperties];
  const rendered = await html`
    <!doctype html>
    <h1>ActivityStreams 2.0</h1>
    <p>Rendered from scraped owl:Ontology</p>
    ${ontologies.map(
      ontology => html`
      <h2>${ontology.name}</h2>
      ${renderOntologyDefinitions(ontology)}
    `
    )}
  `;
  console.log(rendered);
}

if (require.main === module) {
  main().catch((e: Error) => {
    throw e;
  });
}
