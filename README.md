# YuGiOh Referee

**DISCLAIMER**

We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Konami (YuGiOh), or any of its subsidiaries or its affiliates. The official Konami (YuGiOh) website can be found at https://www.konami.com/games/.

The names YuGiOh and Konami as well as related names, marks, emblems and images are registered trademarks of their respective owners.

## Introduction

This project is an attempt to make the game, especially for beginners, more accessible by providing an automated referee that is able to validate moves and supervice whole matches. The referee will try to resolve any situation according to the offical YuGiOh ruling.

## How to run

To run the YuGiOh referee you need some setup first.

1. Download the latest NodeJS release [here](https://nodejs.org/). (Older versions may work as well)
2. Download MongoDB [here](https://www.mongodb.com/)
3. Rename `.env.example` to `.env` and fill all configuration
4. Run `npm i --save`
5. Run `npm run start`

Now you are good to go and can access the referee via your browser.

## What is comming next?

This project is worked on in my free time. Thereby new features can take a while until they are implemented. Nontheless I want to add certain features. (The scope may be changed at any time)

- [x] Gathering cards from the offical YuGiOh database
  - [x] Storing the gathered data in a paralell database
- [ ] Validating a YuGiOh game
  - [ ] Validate single actions
  - [ ] Resolve effect chains
  - [ ] Supervise a whole match
    - [ ] Include healthpoints and the amount of cards in the hand and decks
- [ ] A website from which you can access the referee
  - [ ] A user login
    - [ ] OAuth support
  - [ ] Managing multiple duels at once

## Contributing

If there is an feature you want to see. Create an issue where we can discuss if this feature should be added to the repository. If you are able to programm yourself feel free to create a PR with your feature (at least an working PoC).

For more details see [Code of Conduct](CODE_OF_CONDUCT.md)