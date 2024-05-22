## To run application: 
Open ItunesApp folder and launch the app by typing ‘npm start’ from the command line interface.
Open Client folder and launch the frontend by typing ‘npm start’ from the command line interface.

## How to use the Application
- From your react localhost root url (http://localhost:3000/)

Search and Navigation
- The UI provides the user with an Input Field and Filter by Media Type dropdown
- Enter your search query in the input labeled "Search iTunes"
- Refine search results using the Media Type dropdown
- In the header there is a "My Favorites link" that will route the user to a page listing the saved tracks
- Also in the header the user can click on "React Itunes Search APP" to return to the home page

Results
- After a query has been submitted the results are displayed below the search bar
- Click on one of the results to view details of the selected track

Saving Favorites
- When viewing a selected track the user can click on the "Save to Favorites" button to store the track in local storage
- The user can remove the saved track from favorites by clicking the same button that now says Remove from Favorites

Viewing Favorites
- In the header there is a "My Favorites link" that will route the user to a page listing the saved tracks

## Security
Using Helmet to secure the iTunesApp Express app as it is a good practice as it helps set various HTTP headers to enhance security. Helmet is a collection of middleware functions that can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

## Testing
For testing I used Jest and supertest 
To test if useFavoritesSession Hook is working
from terminal run "npm test"

## App Deployed to GIT
iTunesApp = https://github.com/JoBrits/iTunesApp.git
iTunesAppClient = https://github.com/JoBrits/iTunesAppClient.git