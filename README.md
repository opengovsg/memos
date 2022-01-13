
# Memos

## Getting started

Ensure that you have access to a PostgreSQL instance running in your development environment. You have two options if you
do not have PostgreSQL already set up:

1. Install using Homebrew: `brew install postgresql@13`
2. Run PostgreSQL using Docker

After setting up PostgreSQL, run the following to start up the development environment.

```sh
# Create development database
$ createdb healthpass_dev

# Setup .env files and replace values within it
$ cp backend/.env-example backend/.env

# Install dependencies
$ npm install

# Run migrations
$ npm run on-backend -- migration:run

# Start development client and server
$ npm run dev
```

## Migrations

_In backend folder,_

### Run migrations

```
npm run migration:run
```

### To auto-generate migrations

```
npm run migration:gen -- -n <migration-name>
```