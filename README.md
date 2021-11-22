# MiamiStarter

Miamistarter is a Web 3.0 app that allows $MIA token holders to vote on and/or invest in innovative crypto and tech startups based in Miami.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Live URL

[MiamiStarter](https://miamistarter.herokuapp.com)

## Problem

Talent and capital have often been cited as barriers to Miami's growth as the next tech hub. To become the next tech hub, Miami needs to attract and retain more tech talent in the city. Startups and tech workers are attracted to investment potential and innovation networks.

MiamiCoin’s contributions to the city's treasury have grown to millions of dollars in just a few months, and Mayor Suarez and the City of Miami Commission have proposed several uses for the funds, including crypto education and incentives for tech entrepreneurs.

## Enter MiamiStarter

Miamistarter is a Web 3.0 app that allows $MIA token holders to vote on and/or invest in innovative crypto and tech startups based in Miami.

MiamiStarter helps the city put the funds it receives via $MIA mining to attract crypto founders and other tech entrepreneurs to Miami, thereby growing Miami's tech ecosystem. Moreover, by requiring $MIA tokens to participate in the voting process, MiamiStarter creates an incentive for people to hold $MIA, thereby contributing to $MIA adoption in the city.

## How MiamiStarter Works

Each funding cycle lasts for 30 days. Prior to the start of each cycle, the city's municipal government vets projects from Miami-based businesses and features them on MiamiStarter. The city also releases a set amount of funding, in the form of $MIA tokens, into a smart  contract.

During each cycle, $MIA token holders can review and vote on project proposals featured on MiamiStarter. To do so, users must possess a Stacks wallet (i.e., Hiro) that holds a minimum balance of $MIA tokens. Each user can only cast one vote in each funding cycle.

Besides voting, users can directly invest in projects using $MIA tokens. If they meet certain investment thresholds, then they could be eligible to mint limited edition NFTs that give them access to special perks.

At the end of each cycle, each project would receive an amount of $MIA token that is proportional to the number of votes on their projects. Suppose a project received 200 votes out of a possible 1000 total votes in a given cycle; in this case the startup is eligible to receive 20% of the funding pool. The $MIA tokens can either be cashed out to US dollars to fund immediate needs or stacked to earn a yield and cashed out later on. A smart contract, built on top of Stacks protocol, automates the deposit, transfer, and withdrawal of funds.

## How to Use MiamiStarter

1. Install the [Hiro Wallet](https://www.hiro.so/wallet), which is a Stacks wallet. The wallet allows you to connect to MiamiStarter using your digital assets and identity.        
2. Acquire MiamiCoin ($MIA) either by buying from okcoin.com or by mining.          
3. Login to MiamiStarter with your wallet, which must have some $MIA tokens.          
4. Vote on or invest directly in projects with $MIA.

## Repo Structure

- `/src`
  - `/api`
    - `client.js`: a client wrapper around the Fetch API that supports `GET`, `POST`, `PUT`, and `DELETE` requests
  - `/app`: contains the top-level component for the application
    - `/layout`
      - `/footer`: contains the `Footer` component and css file
      - `/header`: contains the `Header` component and css file
      - `/navigation`: contains the `Navigation` component and css file
      - `index.js`: defines and exports the `Layout` component, which contains the routing for the application
      - `layout.module.css`
    - `index.js`: exports the `App` component, which can render different layouts
    - `store.js`: configures and exports the Redux store
  - `/common`: contains code used across components annd throughout the application
    - `/constants`: contains shared constants (e.g., `STATUS.idle`)
    - `/core`: contains generic components (e.g., `Button`, `Modal`, `Loader`, etc.)
    - `/utils`: contains utility functions (e.g., `formatNumber()`)
  - `/features`: contains the code for the main features of the application
    - `/coins`: contains all files related to the `coins` feature
      - `/list`: contains the `CoinsList` component, test, css, and test data files
      - `/view`: contains the `CoinView` component, test, css, and test data files
      - `coins.service.js`: contains all API logic for the coins feature
    - `/collectibles`: contains all files related to the `collectibles` feature
      - `/list`
      - `/view`
      - `collectibles.service.js`
    - `/favorites`: contains all files related to the `favorites` feature
      - `/create`
      - `/edit`
      - `/list`
      - `favorites.service.js`
    - `/no-match`
      - `index.js`
    - `index.js`: exports the components from the `/features` folder
  - `/styles`
    - `global.css`: contains global css styles used throughout the application
  - `index.js`: entry point to the React Application
  - `setupTests.js`: import any additional libraries used to extend test functionality (e.g, `jest-dom`)
- `.env`: contains environment variables (typically added to `.gitignore`)
- `db.json`: JSON database for your fake REST API
- `routes.json`: routing logic for your fake REST API

The following principles were applied in the design of the folder structure:

- A consistent and predictable naming convention makes it relatively easy to locate needed files and understand where new files should be created. Each feature contains sub-folders that represent a CRUD operation for that feature (e.g., `/create`, `/edit`).

- All files related to a component (e.g., component, test, and css files) are kept together under a single folder so it's easy to find and update the code for a given feature.

- The service abstracts away the API logic for each feature, thereby avoiding the need to hard-code the API calls into the components directly.

- Core UI components such as Button, Form, List, etc. are kept in a separate directory (i.e., `src/common/core`). As the UI library continues to grow, the core UI library could be packaged for use in another project or published as part of Storybook. Some developers on the team can even focus on this directory only.

## User Stories

1. As a user, I want to connect my Stacks wallet to the website, so that I can vote on projects.
2. As a user, I want to view a list of projects, so that I can view the most important information about each project.
3. As a user, I want to view a specific project, so that I can get more specific information about the project and vote on/invest in the project.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
