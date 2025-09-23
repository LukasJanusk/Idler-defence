# React Game Project

## Project description

Goal of this project is to create 2D RPG game with Tower defence mechanics.
Currently game support 4 playable characters and one test level for showcase.
Ui should be intuitive to use. For more details on how things work click Help button in the Menu.

## Screenshots
![game screenshot](https://github.com/LukasJanusk/Idler-defence/blob/main/screenshots/idler-2025-09-23-140951.jpg?raw=true)
![game screenshot](https://github.com/LukasJanusk/Idler-defence/blob/main/screenshots/idler-2025-09-23-141446.jpg?raw=true)
![game screenshot](https://github.com/LukasJanusk/Idler-defence/blob/main/screenshots/idler-2025-09-23-142154.jpg?raw=true)

## Setup

1. `npm install`
2. Create postgress db or use provided link(DM for current dev db link).
3. Setup `.env` files in `client` and `server` based on `.env.example` files (if you just want to play the game on the client side no setup is needed, skip database setup and starting server in the next step).
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

### e2e

Install playwright browsers

```bash
npx playwright install -w client && npx playwright install-deps -w client
```

Start server

```bash
npm run e2e -w server
```

Start client tests

```bash
npm run test:e2e -w client
```
## TODO
- [ ] Implement user account for personal scores (server)
- [ ] Implement Home page
- [ ] Implement Highscores page
- [ ] Implement login flow
- [ ] Implement credits page/section
- [ ] Implement settings  menu
- [ ] Implement loading  screen
- [ ] Implement splash screen with game title
- [ ] Implement onboarding/tutorial
- [ ] Move game rendering to WebGl
- [ ] Implement level select screen
- [ ] Implement ingame Main menu
- [ ] Implement load/save
- [ ] Integrate links to social media
- [ ] Implement login security
- [ ] Implement login with google
- [ ] Implement Skill upgrade tree?
- [ ] Implement item/inventory?
- [ ] Implement sounds
- [ ] Add ranged enemies
- [ ] Setup docker containers
- [ ] Prepare CI/CD
- [ ] Publish
