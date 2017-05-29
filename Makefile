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

full-install: install create-db migrate-latest seed
