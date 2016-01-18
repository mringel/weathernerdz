# weathernerdz

a sample weather app that uses the Dark Sky Forecast API, leaflet, angular, and plotly.

Map tiles are from Open Street Map with data from OSM contributors.



## To Deploy:

Clone this repo and run ```npm install``` and ```gulp```.

Then simply point your browser to ```/build/index.html```.
### Or:

After running gulp, run ```node server.js``` and point your browser to ```localhost:3000```.


## To Use:

Double-click anywhere on the map to get current hourly apparent temperature and humidity data for that point.  Then, for data for another date, input that date and click the "Get Weather Data" button.  The plots will show humidity and apparent temperature data for the last double-clicked location for the date that was selected.

## To run tests:

Run ```gulp webpack:test``` then ```karma start```.  If you get an error you may need to install karma-cli globally.  Try:  
```npm install -g karma-cli```  
and then running ```karma start```.   


This app was tested in Chrome.

## Roadblocks encountered:

### Double-clicks in Leaflet 1.0.0 Beta 2
I found a bug in leaflet 1.0.0 beta 2 when using chrome on a touch screen.  Mouse double-clicks are not recognized in leaflet when touch is enabled.  See known issue here:
https://github.com/Leaflet/Leaflet/issues/4127   
**Workaround: Used Leaflet 0.7.7**

### Plotly doesn't work with webpack.
The Plotly website insists it works with Webpack despite giving warnings, but I found numerous examples of people having the same issue.  
**Workaround: load plotly from a src tag in index.html instead of bundling with webpack.**

### Dark Sky API doesn't allow cross-origin requests

Most of my previous work included building a backend to serve the app from, including building the api interface that the app would use, so I never had to use JSONP before.  The answer turned out to be pretty simple, but I went down a dark hole before discovering $http.jsonp.
