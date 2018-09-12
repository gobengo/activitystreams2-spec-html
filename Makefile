default: lib
.PHONY: default

ts-node = ./node_modules/.bin/ts-node
SRCS = $(wildcard ./src/*.tsx?)

node_modules: package.json
	npm install
	touch $@

lib: node_modules $(SRCS)
	npm run make:lib
