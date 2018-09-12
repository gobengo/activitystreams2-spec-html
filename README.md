# activitystreams2-spec-html

First we scraped [ActivityStreams 2](https://www.w3.org/TR/activitystreams-core/) into a machine-readable Ontology via [activitystreams2-spec-scraped].

For our next trick, we will render the machine-readable Ontology back into some human-readable HTML. This is mean to enable workflows where future changes to the spec can be done as pull requests to the machine readable *model* of the Ontology instead of brittle changes to a big HTML document.

If this works, the tool should be useful for Ontologies other than ActivityStreams 2.0 as well.
