## Setup

1. `npm install`
2. Create postgress db or use provided link
3. Setup `.env` files in `client` and `server` based on `.env.example` files.
4. If using local db run:

```bash

npm run migrate:latest -w server

```

## Running the project in development

```bash

npm run dev -w server

npm run dev -w client

```

## Tests

```bash

# front end tests
npm test -w client


# back end tests
npm test -w server
```
