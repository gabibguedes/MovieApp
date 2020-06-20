# Turtle Trial - Movie App

This project is an app made with React Native to show a list of movies from [movies.js](https://tender-mclean-00a2bd.netlify.app/mobile/movies.json) and the it's comments.

## Set up Firebase

Before running the project it's necessary to set up a firebase connection. 

[Create a firebase project](https://firebase.google.com/), and add it's configuration on `src/utils/firebaseConfig.js`. Use the template file [firebaseConfig_example.js](./src/utils/firebaseConfig_example.js).


## Run the app with Docker
Create a file named `.env` in the project root, with the following line:

```
REACT_NATIVE_PACKAGER_HOSTNAME=[Your IP address]
```

Change from `[Your IP address]` to your computer's IP address. See the exaple on [.env_template](./.env_template).

Inside the project folder use the following command to run the app on a docker container:

```sh
docker-compose up
```

## Run the app without docker:

Make sure you have expo installed:

```sh
yarn global add expo-cli
```

Install the packages:

```sh 
yarn
```

Run the app:

```sh
yarn start
```

## Access the App
Intall Expo on your smartphone. See the following links:
- [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US)
- [App Store](https://apps.apple.com/br/app/expo-client/id982107779)

Scan the QR code displayed with your smartphone and wait for the app to build.

Make sure your computer and phone are in the same network.

## Architecture

The app was made in React Native, using Expo. It connects to firebase for the comments.


## What to improove

- Add login