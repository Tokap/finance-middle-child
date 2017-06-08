NODE_BIN=./node_modules/.bin

# ----------------
#    DEVELOPMENT
# ----------------
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

run-tests:
	npm test
