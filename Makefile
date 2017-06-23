NODE_BIN=./node_modules/.bin

install:
	npm install

server:
	node ./src/server/index.js

create-db:
	createdb application_data

drop-db:
	dropdb application_data

migrate-latest:
	${NODE_BIN}/knex migrate:latest

migrate-rollback:
	${NODE_BIN}/knex migrate:rollback

migrate-up:
	${NODE_BIN}/knex-migrate up --only $(filename)

migrate-down:
	${NODE_BIN}/knex-migrate down --only $(filename)

seed:
	node ./src/seed.js

get-posts:
	node ./src/get_posts.js

get-stock-history:
	node ./src/get_stocks.js

full-install: install create-db migrate-latest seed get-posts get-stock-history

test-db:
	createdb test_application_data
	${NODE_BIN}/knex migrate:latest --env test
	${NODE_BIN}/mocha test/postgres.spec.js
	dropdb test_application_data

test-all:
	createdb test_application_data
	${NODE_BIN}/knex migrate:latest --env test
	npm test
	dropdb test_application_data

test-one:
	${NODE_BIN}/mocha test/$(test).spec.js
