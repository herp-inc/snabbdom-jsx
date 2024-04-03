all:

format: install
	yarn prettier --write .

install:
	yarn install

lint: install
	yarn eslint --ext ts --ext tsx ./src --report-unused-disable-directives

test: install
	yarn jest --watch ./src

typecheck: install
	yarn tsc --noEmit --watch
