default: built/activitystreams2-spec-html built/www/index.html
.PHONY: default

ts-node = ./node_modules/.bin/ts-node
SRCS = $(wildcard ./src/*.tsx?)

node_modules: package.json
	npm install
	touch $@

built/activitystreams2-spec-html: node_modules $(SRCS)
	npm run build

built/www/index.html: src/index.ts
	mkdir -p built/www
	$(ts-node) src/index.ts > $@
