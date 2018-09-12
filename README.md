# activitystreams2-spec-html

First we scraped [ActivityStreams 2](https://www.w3.org/TR/activitystreams-core/) into a machine-readable Ontology via [activitystreams2-spec-scraped].

For our next trick, we will render the machine-readable Ontology back into some human-readable HTML. This is mean to enable workflows where future changes to the spec can be done as pull requests to the machine readable *model* of the Ontology instead of brittle changes to a big HTML document.

If this works, the tool should be useful for Ontologies other than ActivityStreams 2.0 as well.

## Run locally

Install dependencies, then use them to render AS2 HTML to ./built/www/

```
make
```

Run a web server that serves ./built/www/

```
npm start
```

The web server will listen on port 8080 by default, but will use the `PORT` environment variable if set.

### Run with Docker

The dockerfile defaults `PORT` to 5000 to be compatible with [GitLab Auto DevOps](https://docs.gitlab.com/ee/topics/autodevops/#stages-of-auto-devops).

```
docker build -t as2-spec-html .
docker run -p 5000:5000 -it as2-spec-html
```
