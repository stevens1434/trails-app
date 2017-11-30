# My Movie Database

This app is was designed to sort through your movies and find the one that you want to watch.
It also gives additional information on your movie based on IMDB information.

## Screenshots

### Search For Activities
![Alt text](http://res.cloudinary.com/stevens1434/image/upload/v1512072337/TRAILS_-_search_page_kl4t48.png)

### View All Saved Activities By User
![Alt text](http://res.cloudinary.com/stevens1434/image/upload/v1512072337/TRAILS_-_all_trails_page_adzoye.png)

### View Specific Saved Activity With Map Of Breweries
![Alt text](http://res.cloudinary.com/stevens1434/image/upload/v1512072337/Trails_-_Specific_Hike_auyfpl.png)

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express
- mongodb
- React.js
- Brewery API
- Trails API
- Google Maps API

## Process

### Approach

First, I put myself in the seat of the user and decided what functionality I wanted in the app.
Afterwards, I pseudo-coded the the views, which are found in the client/src file. Then, I created mock-ups of
what the pages should look like. Finally, I began to write the code.

### User Story

This user is someone who enjoys to hike but also enjoys food and a beverage after their hike, on their way home.
He or she will use this app to search for beer within ten miles of their hike.

## Installation

Fork and clone repository. Install dependencies found in both package.json files (in root file and in client file).

## Authors

AJ Stevens

## Additional Instructions for Download

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Change the database names in `config/config.json` to reflect your project
  * Run `createdb project_name_development` to create the development database
  * Run `createdb project_name_test` to create the test database
